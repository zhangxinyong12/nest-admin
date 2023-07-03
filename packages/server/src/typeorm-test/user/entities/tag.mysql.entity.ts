import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article..mysql.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    comment: '标签名',
  })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
