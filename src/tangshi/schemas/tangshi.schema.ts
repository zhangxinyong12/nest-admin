import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from 'src/shared/schemas/base.chemas';

export type TangShiDocument = TangShi & Document;

@Schema({
  versionKey: false,
})
export class TangShi extends BaseModel {
  @Prop()
  title: string;

  @Prop()
  auth: string;

  @Prop()
  type: string;

  @Prop()
  content: string[];

  @Prop()
  desc: string;
}

export const TangShiSchema = SchemaFactory.createForClass(TangShi);
