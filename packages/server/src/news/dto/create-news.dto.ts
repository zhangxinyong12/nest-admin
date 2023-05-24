import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty({ message: 'title 标题不能为空' })
  @ApiProperty({ example: '五一劳动节' })
  readonly title: string;

  @IsNotEmpty({ message: 'content 内容不能为空' })
  @ApiProperty({ example: '内容内容内容内容内容' })
  readonly content: string;

  @IsNotEmpty({ message: 'auth 作者不能为空' })
  @ApiProperty({ example: 'zhangsan' })
  readonly auth: string;

  @ApiProperty({ example: '其他' })
  readonly category?: string;
}
