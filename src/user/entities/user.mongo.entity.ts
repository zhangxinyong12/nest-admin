import { Common } from 'src/shared/entities/common.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends Common {
  @Column({ length: 11 })
  phone: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
