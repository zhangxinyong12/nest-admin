import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from 'src/shared/utils/regex.util';

export class LoginDTO {
  @Matches(regMobileCN, { message: '手机号格式不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @ApiProperty({
    example: '13800138000',
    description: '手机号',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}
