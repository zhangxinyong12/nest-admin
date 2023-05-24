import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from 'src/shared/schemas/base.chemas';

export type NewsDocument = HydratedDocument<News>;

@Schema({
  versionKey: false, // 去掉版本锁 __v
})
export class News extends BaseModel {
  @Prop({
    required: true,
    message: '标题不能为空',
  })
  title: string;

  @Prop({
    required: true,
    message: '内容不能为空',
  })
  content: string;

  @Prop({
    required: true,
    message: '作者不能为空',
  })
  auth: string;

  // 文章分类
  @Prop({
    required: false,
    default: '其他',
  })
  category?: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
