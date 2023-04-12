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
  @ApiProperty({
    description: '手机号',
    type: String,
    example: '13800138000',
  })
  @Matches(/^1\d{10}$/g, { message: '请输入手机号' })
  phone: string;

  @ApiProperty({
    example: 'zhangsan',
  })
  name: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 16, { message: '密码长度为6-16位' })
  password: string;

  @ApiProperty({
    example: '11111111@qq.com',
    required: false,
  })
  @IsEmail({}, { message: '请输入正确的邮箱' })
  email: string;
}
