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
    const findData = this.catRepository.findOneBy({ id });

    return findData;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return this.catRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return this.catRepository.recover({ id });
  }
}
