import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

// export class PaginationParamsDto {
//   @ApiPropertyOptional({
//     description: 'Optional, defaults to 100',
//     type: Number,
//   })
//   @IsNumber()
//   @IsOptional()
//   @Min(0)
//   @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
//   limit = 100;

//   @ApiPropertyOptional({
//     description: 'Optional, defaults to 0',
//     type: Number,
//   })
//   @IsNumber()
//   @IsOptional()
//   @Min(0)
//   @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
//   offset = 0;
// }

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'PageSize, defaults to 100',
    type: Number,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  pageSize?: number;

  @ApiPropertyOptional({
    description: 'Page, defaults to 0',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page?: number;

  @ApiPropertyOptional({
    description: '分页的查询参数',
    type: Object,
    example: {},
    required: false,
  })
  params?: { [key: string]: any };
}
