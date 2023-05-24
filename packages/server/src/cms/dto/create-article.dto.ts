import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiProperty({
    example: '标题',
  })
  title: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  @ApiProperty({
    example: '内容',
  })
  content: string;
}
