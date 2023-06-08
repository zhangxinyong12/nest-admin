import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TangshiService } from './tangshi.service';
import { CreateTangshiDto } from './dto/create-tangshi.dto';
import { UpdateTangshiDto } from './dto/update-tangshi.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { Public } from 'src/shared/auth/decorator/auth.decorator';

@Controller('tangshi')
export class TangshiController {
  constructor(private readonly tangshiService: TangshiService) {}

  // @Post()
  // create(@Body() createTangshiDto: CreateTangshiDto) {
  //   return this.tangshiService.create(createTangshiDto);
  // }

  @Post()
  // @Get()
  @HttpCode(200)
  @Public()
  findAll(@Body() body: PaginationParamsDto) {
    console.log('body', body, new Date());
    return this.tangshiService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tangshiService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTangshiDto: UpdateTangshiDto) {
  //   return this.tangshiService.update(id, updateTangshiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tangshiService.remove(id);
  // }

  // 初始化数据 只执行第一次
  @Post('init')
  init() {
    return this.tangshiService.init();
  }
}
