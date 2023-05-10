import { Common } from 'src/shared/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Article extends Common {
  // 标题
  @Column('text')
  title: string;

  // 内容
  @Column('text')
  content: string;

  // 作者
  @Column('text')
  auth?: string;
}
