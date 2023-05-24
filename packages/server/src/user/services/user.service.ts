import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { UploadService } from 'src/shared/upload/upload.service';
import {
  encryptPassword,
  makeSalt,
  getFileHash,
} from 'src/shared/utils/cryptogram.util';
import { Like, MongoRepository } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly logger: AppLogger,
    private readonly uploadService: UploadService,
  ) {
    this.logger.setContext(UserService.name);
  }
  // 加密密码
  getPassword(password: string): {
    salt: string;
    hashPassword: string;
  } {
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码
    return { salt, hashPassword };
  }

  // 创建用户
  async create(user: CreateUserDto) {
    this.logger.log(null, 'create user', user);

    // 用户名和手机号必须唯一
    const findData = await this.userRepository.find({
      where: {
        $or: [{ name: user.name }, { phone: user.phone }],
      },
    });
    if (findData.length) {
      throw new InternalServerErrorException('用户名或手机号已存在');
    }
    const { salt, hashPassword } = this.getPassword(user.password);

    user.salt = salt;
    user.password = hashPassword;

    return this.userRepository
      .save(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.logger.error(null, 'create user error222', err);
        throw new InternalServerErrorException(err);
      });
  }

  // 模糊查询 分页接口
  async findAll({ page, pageSize, params = {} }: PaginationParamsDto) {
    const { name, phone, email } = params;
    console.log(params);
    const query: MongoFindManyOptions<User> = {
      order: {
        updatedAt: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
      where: {
        // TODO 模糊查询无效,Like不行？。需要使用正则表达式
        ...(name ? { name: new RegExp(`${name}`) } : {}),
        ...(phone ? { phone: new RegExp(`${phone}`) } : {}),
        ...(email ? { email: new RegExp(`${email}`) } : {}),
      },
    };

    console.log('query', query);
    const [data, count] = await this.userRepository.findAndCount(query);
    return {
      items: data,
      pageSize,
      page,
      total: count,
    };
  }

  // 查询单个用户
  async findOne(id: string) {
    console.log(id);
    const findData = await this.userRepository.findOneBy(id);
    if (!findData) {
      throw new InternalServerErrorException('用户不存在');
    }
    return findData;
  }

  // 更新用户
  async update(id: string, user: UpdateUserDto) {
    await this.findOne(id);
    /// 如果更新密码
    if (user.password) {
      const { salt, hashPassword } = this.getPassword(user.password);
      user.salt = salt;
      user.password = hashPassword;
    }
    user.updatedAt = new Date(); // 手动设置更新日期
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  // 删除用户
  async remove(id: string) {
    await this.findOne(id);
    return this.userRepository.delete(id);
  }

  // 删除全部数据
  async removeAll() {
    const data = await this.userRepository.find();
    data.forEach(async (item) => {
      await this.userRepository.delete(item.id);
    });
    return {
      data,
      length: data.length,
    };
  }

  /**
   * 上传头像
   */
  async uploadAvatar(file) {
    const { url } = await this.uploadService.upload(file);
    return { data: url };
  }
}
