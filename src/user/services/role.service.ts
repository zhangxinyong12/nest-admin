import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from '../dtos/role.dto';
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto';
import { Role } from '../entities/role.mongo.entity';
import { Http } from 'winston/lib/winston/transports';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
  ) {}

  async create(Role: CreateRoleDto) {
    // name 为唯一值，如果已经存在则不创建
    const { name } = Role;
    const isCreate = await this.roleRepository.findOne({
      where: { name },
    });
    console.log(isCreate);
    if (isCreate) {
      throw new HttpException(`角色${name}已存在`, HttpStatus.NOT_IMPLEMENTED);
    }

    return this.roleRepository.save(Role);
  }

  async findAll({
    pageSize,
    page,
  }: PaginationParamsDto): Promise<{ data: Role[]; count: number }> {
    const [data, count] = await this.roleRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return {
      data,
      count,
    };
  }

  async findOne(id: string) {
    return await this.roleRepository.findOneBy(id);
  }

  async update(id: string, Role: CreateRoleDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach((k) => delete Role[k]);
    // 更新时间戳
    // course.updatedAt = new Date()
    return await this.roleRepository.update(id, Role);
  }

  async remove(id: string): Promise<any> {
    return await this.roleRepository.delete(id);
  }

  async clearAll(): Promise<any> {
    const [data, count] = await this.roleRepository.findAndCount();
    if (count > 0) {
      return await this.roleRepository.clear();
    } else {
      return Promise.resolve();
    }
  }
}
