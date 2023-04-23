import { MongoRepository } from 'typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/shared/utils/cryptogram.util';
import { User } from '../entities/user.mongo.entity';
import { UserInfoDto } from '../dtos/auth.dto';
import { LoginDTO } from '../dtos/login.dto';
import { Role } from '../entities/role.mongo.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  // 生成token
  async createToken(user: User) {
    const payload = { id: user.id };
    console.log(1111111, payload);
    const token = this.jwtService.sign(payload);
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

    return user;
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.createToken(user);
    return {
      token,
    };
  }

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
  async getPhone(phone: string) {
    const phoneStr = 'verifyCode' + phone;
    return phoneStr;
  }
  /**
   * 获取短信验证码
   * @param phone
   * @returns
   */
  async generateCode(phone: string) {
    const redisCode = await this.redis.get(this.getPhone(phone));
    console.log('redisCode 1', redisCode);
    if (redisCode) {
      throw new NotFoundException('验证码已发送，请稍后再试');
    }
    const captcha = await this.createCaptcha();
    await this.redis.set(this.getPhone(phone), captcha, 'EX', 60);
    return captcha;
  }

  /**
   * 校验验证码
   * @param phone
   * @param code
   * @returns
   */
  async verifyCode(phone: string, code: string) {
    const redisCode = await this.redis.get(this.getPhone(phone));
    console.log(redisCode, code);
    if (redisCode !== code) {
      throw new NotFoundException('验证码错误');
    }
    return true;
  }
}
