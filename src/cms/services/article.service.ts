import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

import { Article } from '../entities/article.mongo.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: MongoRepository<Article>,
  ) {}

  // 创建文章
  async create(createArticleDto: CreateArticleDto) {
    // 文章title 不能重复
    const { title } = createArticleDto;
    const article = await this.articleRepository.findOneBy({
      title,
    });
    if (article) {
      throw new InternalServerErrorException('文章标题不能重复');
    }
    return this.articleRepository.save(createArticleDto);
  }

  // 查询所有文章
  findAll() {
    // 查询所有的文章按照时间倒叙，并只包含title 字段
    return this.articleRepository.find({
      select: ['title'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // 查询单个文章
  async findOne(id: string) {
    console.log('文章id', id);
    const data = await this.articleRepository.findOneBy(id);
    if (!data) {
      throw new InternalServerErrorException('文章不存在');
    }
    return data;
  }

  // 更新文章
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id);
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  // 删除文章
  async remove(id: string) {
    await this.findOne(id);
    return this.articleRepository.delete(id);
  }
}
