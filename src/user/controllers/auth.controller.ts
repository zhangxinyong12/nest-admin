import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';
import { AuthService } from '../services/auth.service';
import { UserInfoDto } from '../dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('认证鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  // 登录
  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO),
    description: '登录成功',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  // 获取用户信息
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserInfoDto),
    description: '获取用户信息成功',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  // Authorization: bearer JSON_WEB_TOKEN_STRING.....
  async info(@Req() req: any) {
    console.log(req.user);
    const data = await this.authService.info(req.user.id);
    console.log(data);
    delete data.password;
    delete data.salt;
    return { data };
  }
}
