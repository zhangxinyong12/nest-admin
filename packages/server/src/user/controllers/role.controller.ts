import {
  Controller,
  UseGuards,
  HttpStatus,
  Post,
  Body,
  Query,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/role.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @ApiOperation({
    summary: '新增角色',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('')
  create(@Body() Role: CreateRoleDto) {
    console.log(Role, '新增角色');
    return this.RoleService.create(Role);
  }

  @ApiOperation({
    summary: '查找所有角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateRoleDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get()
  async findAll(@Query() query: PaginationParamsDto) {
    // console.log(query)
    const { data, count } = await this.RoleService.findAll(query);
    return {
      data,
      count,
    };
  }

  @ApiOperation({
    summary: '查找单个角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.RoleService.findOne(id),
    };
  }

  @ApiOperation({
    summary: '更新单个角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: CreateRoleDto,
  ) {
    return {
      data: await this.RoleService.update(id, updateCourseDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '删除单个角色',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(id);
  }

  @ApiOperation({
    summary: '删除全部角色',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Post('clear')
  async clear() {
    await this.RoleService.clearAll();
    return {
      data: null,
    };
  }
}
