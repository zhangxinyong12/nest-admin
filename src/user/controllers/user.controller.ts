import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from 'src/shared/logger/logger.service';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { UploadDTO } from '../dtos/upload.dto';
import { getFileHash } from 'src/shared/utils/cryptogram.util';
import { Public } from 'src/shared/auth/decorator/auth.decorator';

// @ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserController.name);
  }

  @ApiTags('创建用户')
  @ApiOperation({
    summary: '新增用户',
    description: '新增用户',
    tags: ['用户'],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      this.logger.error(null, 'create user error 11', error);
    }
  }

  @ApiTags('获取所有用户')
  @Get()
  findAll(@Body() body: PaginationParamsDto) {
    console.log('body分页', body);
    // 使用环境变量
    // console.log('ENV:URL:', this.configService.get<string>('database.url'));
    return this.userService.findAll(body);
  }

  @ApiTags('获取单个用户')
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);

    return this.userService.findOne(id);
  }

  @ApiTags('更新用户')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('删除用户')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiTags('删除所有用户')
  @Delete()
  removeAll() {
    return this.userService.removeAll();
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req: any,
    @Body() uploadDTO: UploadDTO,
    @UploadedFile() file,
  ) {
    console.log('uploadDTO', uploadDTO.name);
    return this.userService.uploadAvatar(file);
  }
}
