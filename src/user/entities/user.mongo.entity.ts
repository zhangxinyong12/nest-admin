import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 11 })
  phone: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
