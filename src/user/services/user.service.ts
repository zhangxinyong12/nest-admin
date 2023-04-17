import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Query,
} from '@nestjs/common';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
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
  ) {
    this.logger.setContext(UserService.name);
  }

  // 创建用户
  async create(createUserDto: CreateUserDto) {
    this.logger.log(null, 'create user', createUserDto);

    // 用户名和手机号必须唯一
    // const user = await this.userRepository.find({
    //   where: {
    //     $or: [{ name: createUserDto.name }, { phone: createUserDto.phone }],
    //   },
    // });
    // if (user.length) {
    //   throw new HttpException('用户名或手机号已存在', HttpStatus.BAD_REQUEST);
    // }
    return this.userRepository
      .save(createUserDto)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.logger.error(null, 'create user error222', err);
        throw new HttpException(
          '创建用户失败1',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ); // 抛出异常
      });
  }

  // 模糊查询 分页接口
  async findAll({ page, pageSize, params }: PaginationParamsDto) {
    const { name, phone, email } = params;

    const query: MongoFindManyOptions<User> = {
      order: {
        updatedDate: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
      where: {
        // TODO 模糊查询无效,Like不行？。需要使用正则表达式
        ...(name ? { name: new RegExp(`${name}`) } : {}),
        ...(phone ? { phone: Like(`%${phone}%`) } : {}),
        ...(email ? { email: Like(`%${email}%`) } : {}),
      },
    };

    console.log('query', query);
    const [data, count] = await this.userRepository.findAndCount(query);
    return {
      code: 200,
      data,
      count,
    };
  }

  async findOne(id: string) {
    console.log(id);
    const findData = await this.userRepository.findOneBy(id);
    if (!findData) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return findData;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

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
      code: 200,
      data,
      length: data.length,
    };
  }
}
