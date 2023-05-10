import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Article } from '../entities/article.mongo.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: Repository<Article>,
  ) {}

  // 创建文章
  create(createArticleDto: CreateArticleDto) {
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
  findOne(id: string) {
    console.log('文章id', id);
    return this.articleRepository.findOneBy(id as any);
  }

  // 更新文章
  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  // 删除文章
  remove(id: string) {
    return this.articleRepository.delete(id);
  }
}
