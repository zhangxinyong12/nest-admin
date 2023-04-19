import { ApiProperty } from '@nestjs/swagger';

export class UploadDTO {
  @ApiProperty({
    example: 'xxx文件名字',
    description: '文件名字',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: '需要上传的文件',
  })
  file: Express.Multer.File;
}
