import { OmitType } from '@nestjs/swagger';
import { Common } from 'src/shared/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
class BaseCat extends Common {}

@Entity()
export class Cat {
  // 自增长id
  @PrimaryGeneratedColumn()
  id: number;

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
