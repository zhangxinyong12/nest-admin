import { MongoRepository } from 'typeorm';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword, makeSalt } from 'src/shared/utils/cryptogram.util';
import { User } from '../entities/user.mongo.entity';
import { registerBySMSDto, registerDto, UserInfoDto } from '../dtos/auth.dto';
import { LoginDTO } from '../dtos/login.dto';
import { Role } from '../entities/role.mongo.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { CaptchaService } from 'src/shared/captcha/captcha.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
    @InjectRedis() private readonly redis: Redis,
    private readonly captchaService: CaptchaService,
    private readonly userService: UserService,
  ) {}

  // 生成token
  async createToken(user: User) {
    console.log('user id', user);
    const token = this.jwtService.sign(user);
    return token;
  }

  /**
   * 登陆校验用户信息
   * @param loginDTO
   * @returns
   */
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { phone, password } = loginDTO;
    const user = await this.userRepository.findOneBy({ phone });
    console.log(user);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    console.log({ currentHashPassword, dbPassword });
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return this.info(user.id as unknown as string);
  }
  // 保存用户信息到redis 过期时间30d
  async saveUserInfoToRedis(user: User) {
    await this.redis.set(
      `login_user_${user.id}`,
      JSON.stringify(user),
      'EX',
      60 * 60 * 24 * 30,
    );
  }

  // 登录
  async login(loginDTO: LoginDTO) {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.createToken(user);
    // 保存用户信息到redis 过期时间30d
    await this.saveUserInfoToRedis(user);
    return {
      token,
    };
  }

  // 退出登录
  async logout(id: string) {
    await this.redis.del(`login_user_${id}`);
    return true;
  }

  // 获取用户信息
  async info(id: string) {
    console.log('iddddddddd', id);
    // 查询用户并获取权限
    const user = await this.userRepository.findOneBy(id);
    console.log(user);
    const data: UserInfoDto = Object.assign({}, user);
    if (user.role) {
      const role = await this.roleRepository.findOneBy(user.role);
      if (role) data.permissions = role.permissions;
    }

    return data;
  }

  /**
   * 随机生成4位数字验证码
   * @returns code
   */
  async createCaptcha() {
    const captcha = Math.random().toString().slice(-4);
    return captcha;
  }

  // 拼接手机号
  getPhone(phone: string): string {
    const phoneStr = 'verifyCode' + phone;
    return phoneStr;
  }
  /**
   * 获取短信验证码
   * @param phone
   * @returns
   */
  async generateCode(phone: string) {
    console.log('phone', phone);
    const redisCode = await this.redis.get(this.getPhone(phone));
    console.log('redisCode 1', redisCode, this.getPhone(phone));
    if (redisCode) {
      throw new HttpException(
        {
          status: 500,
          error: '验证码已发送，请稍后再试',
        },
        500,
      );
      throw new NotFoundException('验证码已发送，请稍后再试');
    }
    const captcha = await this.createCaptcha();
    await this.redis.set(this.getPhone(phone), captcha, 'EX', 60);
    return captcha;
  }

  /**
   * 校验手机验证码
   * @param phone
   * @param code
   * @returns
   */
  async verifyCode(phone: string, code: string) {
    const redisCode = await this.redis.get(this.getPhone(phone));
    console.log(redisCode, code);
    if (!redisCode) {
      throw new InternalServerErrorException('验证码已过期');
    }
    if (redisCode != code) {
      throw new InternalServerErrorException('验证码错误');
    }
    return true;
  }
  // 获取图像验证码
  async getCaptcha() {
    const { data, text } = await this.captchaService.captche();
    const id = makeSalt(8);
    console.log('图片验证码', id, text);
    await this.redis.set('captche_' + id, text, 'EX', 60);
    // 拼接图片验证码
    const image = `data:image/svg+xml;base64,${Buffer.from(data).toString(
      'base64',
    )}`;
    return { id, image };
  }

  // 校验图像验证码
  async verifyCaptcha(id: string, code: string) {
    const redisCode = await this.redis.get('captche_' + id);
    console.log(redisCode, code);
    if (!redisCode) {
      throw new InternalServerErrorException('验证码已过期');
    }
    // 转换为小写 不区分大小写
    if (redisCode.toLowerCase() !== code.toLowerCase()) {
      throw new InternalServerErrorException('验证码错误');
    }
    return true;
  }

  // 校验手机验证码并注册用户，登录用户
  async registerBySMS({ phone, code }: registerBySMSDto) {
    // 校验手机验证码
    await this.verifyCode(phone, code);
    return this.register(phone, phone, phone);
  }

  async registerByphoneAndName({ phone, name, password }: registerDto) {
    return this.register(phone, name, password);
  }

  // 手机号 用户名 密码注册
  async register(phone, name, password) {
    // 查询用户是否存在
    const user = await this.userRepository.findOneBy({ phone });
    if (user) {
      throw new InternalServerErrorException('用户已存在');
    }
    // 创建用户
    const newUser = await this.userService.create({
      phone,
      password,
      name,
      email: '',
      avatar: '',
      job: '',
      jobName: '',
      organization: '',
      location: '',
      personalWebsite: '',
    });
    console.log('创建newUser', newUser);

    // 生成token
    const token = await this.createToken(newUser);
    // 保存用户信息到redis 过期时间30d
    await this.saveUserInfoToRedis(newUser);
    return {
      token,
    };
  }
}
