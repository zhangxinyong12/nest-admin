import { Inject, Injectable } from '@nestjs/common';
import { create } from 'svg-captcha';
import { Repository } from 'typeorm';
import { remove } from 'winston';
import { ReqPage } from '../type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mysql.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('TYPEORM_TEST_USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // 分页接口
  async findAll(query?: ReqPage) {
    const { page = 1, pageSize = 10, params } = query;
    const { firstName, lastName, age } = params;
    const where = {};
    // 这里的逻辑是，如果有传入参数，就加入到 where 条件中
    // 模糊查询
    if (firstName) {
      where['firstName'] = firstName;
    }
    if (lastName) {
      where['lastName'] = lastName;
    }
    if (age) {
      where['age'] = age;
    }

    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      order: {
        id: 'DESC',
      },
    });

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
