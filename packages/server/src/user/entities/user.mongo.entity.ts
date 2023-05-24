import { ObjectID } from 'mongodb';
import { Common } from 'src/shared/entities/common.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { ObjectId } from 'mongoose';
@Entity()
export class User extends Common {
  // 昵称
  @Column('text')
  name: string;

  // 手机号
  @Column('text')
  phone: string;

  @Column()
  password: string;

  @Column('text')
  avatar?: string;

  // @Unique('email', ['email'])
  @Column({ length: 200 })
  email?: string;

  @Column()
  role?: ObjectID;

  @Column()
  job?: string;

  @Column()
  jobName?: string;

  @Column()
  organization?: string;

  @Column()
  organizationName: string;

  @Column()
  location?: string;

  @Column()
  locationName?: string;

  @Column()
  introduction?: string;

  @Column()
  personalWebsite?: string;

  @Column('boolean')
  verified?: boolean;

  // 加密盐
  @Column({
    type: 'text',
    select: false,
  })
  salt?: string;

  @Column()
  isAccountDisabled?: boolean;
}
