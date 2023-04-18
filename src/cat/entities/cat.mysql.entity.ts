import { OmitType } from '@nestjs/swagger';
import { Common } from 'src/shared/entities/common.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
class Base {
  // 自增长id
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 软删除
  @Column({ default: false, select: false })
  deleted: boolean;

  // 更新次数
  @Column({ default: 0, select: false })
  updateCount: number;
}

@Entity()
export class Cat extends Base {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '猫的名字，长度为4-20个字符',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '猫的年龄',
  })
  age: number;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '猫的品种',
  })
  breed: string;
}
