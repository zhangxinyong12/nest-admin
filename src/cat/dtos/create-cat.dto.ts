import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, Matches, Max, Min } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Tom',
    type: String,
  })
  @IsNotEmpty({ message: 'name不能为空' })
  @Length(4, 20, { message: 'name长度为4-20' })
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 1,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value)) // add this line to parse string to number
  @IsNotEmpty({ message: 'age不能为空' })
  @Max(99, { message: 'age必须小于99' })
  @Min(0, { message: 'age必须大于0' })
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Bengal',
    type: String,
  })
  @IsNotEmpty({ message: 'breed不能为空' })
  breed: string;
}
