import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
// 公共字段
export abstract class Common {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // 软删除
  @Column({ default: false, select: false })
  deleted: boolean;

  // 更新次数
  @Column({ default: 0, select: false })
  updateCount: number;
}
