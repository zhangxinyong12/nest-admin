import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '手机号',
    type: String,
    example: '13800138000',
  })
  phone: string;

  @ApiProperty({
    example: 'zhangsan',
  })
  name: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;

  @ApiProperty({
    example: '11111111@qq.com',
    required: false,
  })
  email: string;
}
