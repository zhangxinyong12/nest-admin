import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { ObjectID, ObjectIdColumn, Unique } from 'typeorm';
import { IdDTO } from '../../shared/dtos/id.dto';

export class CreateRoleDto {
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @Unique(['name']) // 添加 Unique 装饰器，传入包含 name 的属性数组
  name: string;

  @ApiProperty({
    example: {
      'dashboard/workplace': ['write', 'read'],
      user: ['read', 'write'],
      course: ['write', 'read'],
      role: ['read', 'write'],
    },
  })
  @IsNotEmpty()
  permissions: object;
}
