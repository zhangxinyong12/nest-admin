import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReqPage } from '../type';

@Controller('typeorm_test/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 分页接口
  @Get()
  findAll(@Query() query: ReqPage) {
    return this.userService.findAll(query);
  }

  // 分页接口
  @Post('list')
  findList(@Body() body: ReqPage) {
    return this.userService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 测试 1 对 1的关系 新增
  @Post('text1to1')
  text1to1() {
    return this.userService.text1to1();
  }

  @Get('findIdCard/:id')
  findIdCard(@Param('id') id: string) {
    return this.userService.findIdCard(+id);
  }

  // idCad  根据id修改
  @Patch('updateIdCard/:id')
  updateIdCard(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateIdCard(+id, body);
  }
}
