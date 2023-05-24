import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectID,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';

@Entity()
// 公共字段
export abstract class Common {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
  // 软删除
  @Column({ default: false, select: false })
  deleted: boolean;

  // 更新次数
  @Column({ default: 0, select: false })
  updateCount: number;
}
