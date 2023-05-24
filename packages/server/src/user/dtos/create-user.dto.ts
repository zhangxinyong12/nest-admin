import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  Matches,
  Max,
  Min,
  Length,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  /**
   * 手机号（系统唯一）
   */
  @Matches(/^1\d{10}$/g, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13271150672' })
  readonly phone: string;

  @ApiProperty({ example: 'zhang' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  salt?: string;

  @ApiProperty({ example: '11111111@qq.com' })
  email?: string;

  @ApiProperty({ example: 'cookieboty' })
  avatar?: string;

  @ApiProperty({ example: 'frontend' })
  job?: string;

  @ApiProperty({ example: '前端开发工程师' })
  jobName?: string;

  @ApiProperty({ example: 'cookieboty' })
  organization?: string;

  @ApiProperty({ example: 'beijing' })
  location?: string;

  @ApiProperty({ example: 'cookieboty' })
  personalWebsite?: string;

  @ApiProperty({ example: 'role id, admin：管理员权限，user；用户权限' })
  role?;
}
