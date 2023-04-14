import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { MongoRepository } from 'typeorm';
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
  create(createUserDto: CreateUserDto) {
    this.logger.log(null, 'create user', createUserDto);

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

  async findAll() {
    const data = await this.userRepository.find();
    return {
      code: 200,
      data,
      length: data.length,
    };
    // throw new HttpException('自定义异常', HttpStatus.INTERNAL_SERVER_ERROR); // 抛出异常
    return `This action returns all user`;
  }

  findOne(id: string) {
    console.log(id);
    return this.userRepository.findOneBy(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
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
