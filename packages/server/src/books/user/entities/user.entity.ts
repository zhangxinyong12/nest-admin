import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Infor } from './info.entity';

@Entity()
export class BookUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Infor, (info) => info.user)
  @JoinColumn()
  info: Infor;
}
