import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

import { Article } from '../entities/article.mongo.entity';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { spawn } from 'child_process';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: MongoRepository<Article>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
    const data = await this.articleRepository.findOneBy(id);
    if (!data) {
      throw new InternalServerErrorException('文章不存在');
    }
    return data;
  }

  // 更新文章
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    console.log('更新文章', id, updateArticleDto);
    await this.findOne(id);
    await this.articleRepository.update(id, updateArticleDto);
    await this.findOne(id);
    return this.syncNextArticle(id);
  }

  // 删除文章
  async remove(id: string) {
    await this.findOne(id);
    return this.articleRepository.delete(id);
  }

  // 同步更新next的文章 通过http请求 next的接口 /api/revalidate 传入文章id 和 secret token
  async syncNextArticle(id: string) {
    console.log('同步next文章', id);
    const url =
      this.configService.get('NEXT_HOST') +
      `article/update/${id}?secret=` +
      this.configService.get('NEST_VALIDATE_TOKEN');
    // const url = `api/revalidate?secret=${secret}&id=${id}`
    console.log('url', url);
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log('同步next文章', data);
    return data;
  }

  // 测试spawn
  async spawn(command: string, ...args) {
    return new Promise((resolve, reject) => {
      console.log('spawn', command, args);
      const proc = spawn(command, ...args);
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
      let ret = '';
      proc.stdout.on('data', (data) => {
        ret += data.toString();
      });
      proc.on('close', () => {
        resolve(ret);
      });
    });
  }
}
