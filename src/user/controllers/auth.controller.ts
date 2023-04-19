import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { LoginDTO } from '../dtos/login';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';
import { AuthService } from '../services/auth.service';

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
}
