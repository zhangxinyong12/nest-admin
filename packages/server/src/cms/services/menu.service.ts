import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Menu } from '../entities/menu.mongo.entity';
import { MenuDto, UpdateMenuDto } from './../dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @Inject('MENU_REPOSITORY')
    private readonly menuRepository: MongoRepository<Menu>,
  ) {}

  // 创建和更新
  async update(menu: UpdateMenuDto) {
    return this.menuRepository.updateOne(
      {},
      {
        $set: menu,
      },
      { upsert: true },
    );
  }

  // 查询所有
  async findAll() {
    return this.menuRepository.find();
  }
}
