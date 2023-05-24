import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';
import { MenuService } from '../services/menu.service';
import { MenuDto } from './../dto/menu.dto';
@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  // 获取菜单
  @ApiOperation({ summary: '获取菜单' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(MenuService),
    description: '查询成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  // 更新菜单
  @ApiOperation({ summary: '更新菜单' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(MenuService),
    description: '更新成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @HttpCode(200)
  @Post()
  update(@Body() menu: MenuDto) {
    console.log('menu', menu);
    return this.menuService.update(menu);
  }
}
