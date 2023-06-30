import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.mysql.entity';

@Entity('id_card')
export class IdCard {
  @PrimaryGeneratedColumn({
    comment: '主键 id',
  })
  id: number;

  @Column({
    name: 'card_name',
    comment: '身份证号',
    type: 'varchar',
  })
  cardName: string;

  @JoinColumn()
  // 只能设置一级删除。否则会造成循环删除
  @OneToOne(() => User, {
    onDelete: 'CASCADE', // 慎重 删除用户的时候，一并删除身份证 一对一关系 一般是主表删除，从表也删除 .
    onUpdate: 'CASCADE', // 慎重 更新用户的时候，一并更新身份证 一对一关系 一般是主表更新，从表也更新 .
    cascade: true, // cascade 不是数据库的那个级联，而是告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity。
  })
  user: User;
}
