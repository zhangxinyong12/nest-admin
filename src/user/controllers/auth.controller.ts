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
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-reponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/shared/auth/decorator/auth.decorator';
import { LoginDTO } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import {
  CheckPhoneCodeDto,
  CreatePhoneCodeDto,
  UserInfoDto,
} from '../dtos/auth.dto';

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
  @Public()
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
  // @UseGuards(AuthGuard('jwt'))
  @Get('info')
  // Authorization: bearer JSON_WEB_TOKEN_STRING.....
  async info(@Req() req: any) {
    console.log(
      'req.userreq.userreq.userreq.userreq.userreq.userreq.user',
      req.user,
    );
    const data = await this.authService.info(req.user.id);
    console.log(data);
    // delete data.password;
    // delete data.salt;
    return { data };
  }

  // 根据手机号生成验证码
  @ApiOperation({ summary: '根据手机号生成验证码' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '根据手机号生成验证码成功',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('generate-code')
  async generateCode(@Body() body: CreatePhoneCodeDto) {
    return this.authService.generateCode(body.phone);
  }

  // 校验验证码
  @ApiOperation({ summary: '校验验证码' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '校验验证码成功',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('verify-code')
  async verifyCode(@Body() body: CheckPhoneCodeDto) {
    return this.authService.verifyCode(body.phone, body.code);
  }

  // 生成验证码图片
  @ApiOperation({ summary: '生成验证码图片' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '生成验证码图片成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Get('captcha')
  async captcha(@Req() req: any) {
    console.log('user信息', req.user);
    return this.authService.getCaptcha();
  }
}
