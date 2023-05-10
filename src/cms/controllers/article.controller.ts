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
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';
@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '创建文章' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
    description: '创建成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @HttpCode(200)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @ApiOperation({ summary: '查询所有文章' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
    description: '查询成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: '查询单个文章' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
    description: '查询成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @ApiOperation({ summary: '更新文章' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
    description: '更新成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @ApiOperation({ summary: '删除文章' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
    description: '删除成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
