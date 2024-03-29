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
  HttpCode,
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
  CheckVerifyCodeDto,
  CreatePhoneCodeDto,
  registerBySMSDto,
  registerDto,
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
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  // 退出登录
  @ApiOperation({ summary: '退出登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '退出登录成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }
  // 获取用户信息
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserInfoDto),
    description: '获取用户信息成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('info')
  // Authorization: bearer JSON_WEB_TOKEN_STRING.....
  async info(@Req() req: any) {
    const data = await this.authService.info(req.user.id);
    console.log(data);
    // delete data.password;
    // delete data.salt;
    return data;
  }

  // 根据手机号生成验证码
  @ApiOperation({ summary: '根据手机号生成验证码' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '根据手机号生成验证码成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
  @Post('generate-code')
  async generateCode(@Body() body: CreatePhoneCodeDto) {
    return this.authService.generateCode(body.phone);
  }

  // 校验手机验证码
  @ApiOperation({ summary: '校验验证码' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '校验验证码成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
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
  @Public()
  @Get('captcha')
  async captcha(@Req() req: any) {
    console.log('user信息', req.user);
    return this.authService.getCaptcha();
  }

  // 校验图像验证码
  @ApiOperation({ summary: '校验图像验证码' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '校验图像验证码成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
  @Post('verify-captcha')
  async verifyCaptcha(@Body() { id, code }: CheckVerifyCodeDto) {
    return this.authService.verifyCaptcha(id, code);
  }

  // 使用手机号注册并登录
  @ApiOperation({ summary: '使用手机号注册并登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '使用手机号注册并登录成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
  @Post('registerBySMS')
  async registerBySMS(@Body() body: registerBySMSDto) {
    return this.authService.registerBySMS(body);
  }

  // 注册用户
  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse({}),
    description: '注册用户成功',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: BaseApiErrorResponse,
  })
  @Public()
  @Post('')
  async register(@Body() body: registerDto) {
    return this.authService.registerByphoneAndName(body);
  }
}
