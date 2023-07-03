import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.mysql.entity';

@Entity()
// 员工
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @ManyToOne(() => Department, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  department: Department;
}
