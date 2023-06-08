import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { CreateTangshiDto } from './dto/create-tangshi.dto';
import { UpdateTangshiDto } from './dto/update-tangshi.dto';
import { TangShi, TangShiDocument } from './schemas/tangshi.schema';

import fs from 'fs';
import path from 'path';

import dataList from './data';

@Injectable()
export class TangshiService {
  constructor(
    @InjectModel(TangShi.name)
    private readonly tangshiModel: Model<TangShiDocument>,
  ) {}

  // 清空文档
  async clear(): Promise<any> {
    return this.tangshiModel.deleteMany({});
  }

  create(createTangshiDto: CreateTangshiDto) {
    if (this.isExist(createTangshiDto)) {
      throw new InternalServerErrorException('已存在');
    }
    const createdTangshi = new this.tangshiModel(createTangshiDto);
    return createdTangshi.save();
  }

  // 判断是否存在
  async isExist(createTangshiDto: CreateTangshiDto): Promise<boolean> {
    const { title, auth, content } = createTangshiDto;
    const data = await this.tangshiModel.find({ title, auth, content }).exec();
    if (data.length > 0) {
      return true;
    }
    return false;
  }

  // 分页接口 +　模糊查询
  async findAll({ page, pageSize, params }: PaginationParamsDto): Promise<{
    items: TangShi[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    // query 模糊查询
    const query = {};
    params?.title &&
      (query['title'] = { $regex: params?.title, $options: 'i' });
    params?.auth && (query['auth'] = { $regex: params?.auth, $options: 'i' });
    params?.content &&
      (query['content'] = { $regex: params?.content, $options: 'i' });

    // 获取总条数
    const total = await this.tangshiModel.countDocuments(query);

    // 计算出跳过的记录数和返回的记录数
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const limit = pageSize;
    // 查询数据
    const data = await this.tangshiModel
      .find(query)
      .sort({ createdAt: 1 })
      // 排除字段 -desc
      .select('-desc')
      .skip(skip)
      .limit(limit)
      .exec();

    // 返回结果
    return {
      items: data.map((e) => {
        const { _id, title, auth, content, type, createdAt } = e;
        return {
          _id,

          title,
          auth,
          content,
          type,
          createdAt,
          time: new Date(),
        } as any;
      }),
      total,
      page,
      pageSize,
    };
  }

  findOne(id: string): Promise<TangShi> {
    return this.tangshiModel.findById(id).exec();
  }

  update(id: string, updateTangshiDto: UpdateTangshiDto): Promise<TangShi> {
    return this.tangshiModel.findByIdAndUpdate(id, updateTangshiDto).exec();
  }

  remove(id: string): Promise<TangShi> {
    return this.tangshiModel.findByIdAndRemove(id).exec();
  }

  // 初始化数据，只执行第一次，如果有数据就不执行了
  async init(): Promise<any> {
    // const data = await this.tangshiModel.find({}).exec();
    // if (data.length > 0) {
    //   return;
    // }
    await this.clear();

    // dataList 是一个数组，数组中的每一项是一个对象 {title, auth, type, content, desc} 批量插入
    await this.tangshiModel.insertMany(dataList);
    const length = await this.tangshiModel.countDocuments({});

    return {
      message: '初始化成功',
      data: length,
    };
  }

  // 批量读取json目录下的文件，然后创建到数据库中
  async batchCreate(): Promise<any> {
    console.log('batchCreate');
    const files = fs.readdirSync(path.join(__dirname, './json'));
    console.log(files);
    files.forEach(async (file) => {
      const fileData = fs.readFileSync(
        path.join(__dirname, './json', file),
        'utf-8',
      );
      const json = JSON.parse(fileData);
      console.log('fileData', fileData);

      await this.create(json);
    });
    return true;
  }
}
