import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MenuDto {
  @IsNotEmpty({
    message: '菜单内容不能为空',
  })
  @ApiProperty({
    example: [
      {
        key: 'xxx',
        title: '一级标题',
        type: 'category',
        children: [
          {
            key: 'xxx',
            title: '文章一',
            type: 'article',
          },
        ],
      },
    ],
  })
  children: any[];
}

export class UpdateMenuDto extends PartialType(MenuDto) {}
