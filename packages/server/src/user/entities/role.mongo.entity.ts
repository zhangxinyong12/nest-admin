import { Common } from 'src/shared/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends Common {
  @Column('text')
  name: string;

  @Column()
  permissions: object;
}
