import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'Tom',
    type: String,
  })
  @IsNotEmpty({ message: 'firstName不能为空' })
  // @Length(4, 20, { message: 'firstName长度为4-20' })
  firstName: string;

  @ApiProperty({
    description: 'The lastName of the user',
    example: 'Jerry',
    type: String,
  })
  @IsNotEmpty({ message: 'lastName不能为空' })
  lastName: string;

  @ApiProperty({
    description: 'The age of the user',

    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'age不能为空' })
  @Max(100, { message: 'age必须小于100' })
  @Min(1, { message: 'age必须大于1' })
  age: number;
}
