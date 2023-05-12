import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News, NewsDocument } from './schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return createdNews.save();
  }

  // 分页接口
  async findAll({
    page = 1,
    pageSize = 10,
    params = {},
  }: PaginationParamsDto): Promise<{
    items: News[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    // 获取总条数
    const total = await this.newsModel.countDocuments(params);

    // 计算出跳过的记录数和返回的记录数
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // 查询数据
    const data = await this.newsModel
      .find(params)
      .skip(skip)
      .limit(limit)
      .exec();

    // 返回结果
    return {
      items: data,
      total,
      page,
      pageSize,
    };
  }
  async findOne(id: string): Promise<News> {
    return this.newsModel.findById(id).exec();
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsModel
      .findByIdAndUpdate(id, updateNewsDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<News> {
    // 先查询是否存在
    const news = await this.newsModel.findById(id).exec(); // .exec() 执行查询后转化为promise
    if (!news) {
      throw new InternalServerErrorException(`${id}不存在`);
    }
    return this.newsModel.findByIdAndRemove(id).exec();
  }
}
