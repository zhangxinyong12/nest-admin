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
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({ example: 'frontend' })
  @IsNotEmpty()
  job: string;

  @ApiProperty({ example: '前端开发工程师' })
  @IsNotEmpty()
  jobName: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  organization: string;

  @ApiProperty({ example: 'beijing' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  personalWebsite: string;

  @ApiProperty({ example: '1' })
  role?;
}
