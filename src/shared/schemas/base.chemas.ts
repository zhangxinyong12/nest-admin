import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class BaseModel {
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 0 })
  updateCount: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type BaseDocument = BaseModel & Document;
