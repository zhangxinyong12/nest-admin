import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({
    comment: '主键 id',
  })
  id: number;

  @Column({
    name: 'first_name',
    comment: '用户名',
    type: 'varchar',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    comment: '用户姓氏',
    type: 'varchar',
  })
  lastName: string;

  @Column({
    name: 'age',
    comment: '用户年龄',
    type: 'int',
  })
  age: number;
}
