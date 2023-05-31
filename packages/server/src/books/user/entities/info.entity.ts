import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookUser } from './user.entity';

@Entity()
export class Infor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idcard: string;

  @Column()
  gender: string;

  @OneToMany((type) => BookUser, (user) => user.info)
  user: BookUser;
}
