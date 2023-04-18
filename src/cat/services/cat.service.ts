import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { UpdateCatDto } from '../dtos/update-cat.dto';
import { Cat } from '../entities/cat.mysql.entity';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_REPOSITORY')
    private catRepository: Repository<Cat>,
  ) {}
  async create(createCatDto: CreateCatDto) {
    return this.catRepository.save(createCatDto);
  }

  async findAll() {
    const [data, count] = await this.catRepository.findAndCount();
    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const findData = await this.catRepository.findOneBy({ id });
    return { findData };
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    await this.catRepository.update(id, updateCatDto);
    return this.catRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.catRepository.delete({ id });
  }

  async clear() {
    const [data, count] = await this.catRepository.findAndCount();
    await this.catRepository.clear();
    return { data: `清空成功${count}条数据` };
  }
}
