// import { SuccessVO } from '@/shared/dtos/success.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsString, Length } from 'class-validator';
import { regMobileCN } from 'src/shared/utils/regex.util';

export class RegisterSMSDTO {
  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13271150671' })
  readonly phone: string;

  /**
   * 短信验证码
   */
  @IsNotEmpty({ message: '请输入验证码' })
  @ApiProperty({ example: '0000' })
  readonly smsCode: string;

  /**
   * 图形验证码
   */
  @IsNotEmpty({ message: '请输入图形验证码' })
  @ApiProperty({ example: '0000' })
  readonly verifyCode: string;
}

export class RegisterCodeDTO {
  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13271150671' })
  readonly phone: string;

  @IsNotEmpty({ message: '请输入验证码ID' })
  @ApiProperty({ example: 'GaBUGhJzESU=' })
  readonly captchaId: string;

  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '0000' })
  readonly captchaCode: string;
}

export class RegisterDTO {
  /**
   * 手机号，唯一
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13271150671' })
  readonly phone: string;

  /**
   * 用户名
   */
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是 String 类型' })
  @ApiProperty({ example: 'xxxx' })
  readonly name: string;

  /**
   * 用户密码
   */
  @IsNotEmpty({ message: '请输入密码' })
  @ApiProperty({ example: '888888' })
  readonly password: string;

  /**
   * 二次输入密码
   */
  @IsNotEmpty({ message: '请再次输入密码' })
  @ApiProperty({ example: '888888' })
  readonly passwordRepeat: string;
}

export class UserInfoDto {
  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13271150671' })
  readonly phone: string;

  @ApiProperty({ example: 'xxx' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'xxx@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({ example: 'frontend' })
  @IsNotEmpty()
  job: string;

  @ApiProperty({ example: '前端开发工程师' })
  @IsNotEmpty()
  jobName: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  organization: string;

  @ApiProperty({ example: 'beijing' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  personalWebsite: string;

  @ApiProperty({ example: '{}' })
  permissions?: object | [];

  salt?: string;
}

export class RegisterCodeItem {
  /**
   * 手机号
   */
  mobile: string;
}

export class UserInfoItem {
  /**
   * 用户id
   */
  id: number;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;

  /**
   * 手机号
   */
  mobile: string;
}

export class UserInfoVO {
  info: UserInfoItem;
}

// export class UserInfoSuccessVO extends SuccessVO {
//   data: UserInfoVO;
// }

export class CreatePhoneCodeDto {
  @ApiProperty({ example: '13271150671' })
  @IsNotEmpty({ message: '请输入手机号' })
  phone: string;
}

export class CheckPhoneCodeDto extends CreatePhoneCodeDto {
  @ApiProperty({ example: '0000' })
  @IsNotEmpty({ message: '请输入验证码' })
  code: string;
}

// 校验图像验证码
export class CheckVerifyCodeDto {
  @ApiProperty({ example: 'GaBUGhJzESU=' })
  @IsNotEmpty({ message: '请输入验证码ID' })
  id: string;

  @ApiProperty({ example: '0000' })
  @Length(4, 4, { message: '验证码长度为4位' })
  @IsNotEmpty({ message: '请输入验证码' })
  code: string;
}
