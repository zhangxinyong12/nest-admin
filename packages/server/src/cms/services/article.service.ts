import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

import { Article } from '../entities/article.mongo.entity';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { spawn } from 'child_process';
import * as backup from 'mongodb-backup';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class ArticleService implements OnModuleInit {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: MongoRepository<Article>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 服务初始化时执行
  onModuleInit() {
    console.log('ArticleService init');
    // this.handleCron(); // 初始化执行
  }

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

  /**
   * @name  备份mongodb数据库
   * @description
   *  如果您使用 MongoDB 的默认备份工具 mongodump 进行了数据库备份，那么可以按照以下步骤恢复数据：
      将备份文件传输到要进行恢复的 MongoDB 服务器上。
      在备份文件所在的目录下打开终端或命令提示符窗口。
      运行以下 mongorestore 命令来进行恢复操作：

      mongorestore --archive=<backup-file> --nsInclude=<database>.<collection>
      
      其中，<backup-file> 是备份文件的名称，<database> 和 <collection> 分别是要恢复的数据库和集合名称。如果要恢复整个数据库，则将 --nsInclude 参数省略即可。
      等待恢复过程完成，检查数据是否已经成功恢复。
      以上就是使用 mongodump 和 mongorestore 工具进行 MongoDB 数据库备份和恢复的基本步骤。
   */
  async backupDatabase() {
    const uri = this.configService.get('database')['mongodb']['url'];
    const options = {
      uri,
      root: './backup', // 备份文件存放目录
    };

    await backup(options);
  }

  // 每10秒执行一下
  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | month
  // | | | day of month
  // | | hour
  // | minute
  // second (optional)
  // @Cron('*/10 * * * * *')
  @Cron('0 0 * * *') // 每天凌晨 0 点执行一次
  async handleCron() {
    console.log('每天凌晨 0 点执行一次');
    // console.log('定时任务 每10秒执行一次');
  }
}
