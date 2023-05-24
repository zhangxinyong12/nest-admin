// JWT 策略

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { UserService } from 'src/user/services/user.service';
import { MongoRepository } from 'typeorm';
import { User } from 'src/user/entities/user.mongo.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {
    super({
      // 从请求头中获取token 从Authorization头中获取token，请求头要拼接为 Bearer <token>的格式.
      // Authorization: bearer JSON_WEB_TOKEN_STRING.....
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 从请求头中解析token
      // jwtFromRequest: ExtractJwt.fromHeader('token'),
      // 是否忽略过期
      ignoreExpiration: false,
      // 秘钥
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('校验jwt', payload);
    // 如果 token 已经过期，抛出异常
    if (payload.exp < Date.now() / 1000) {
      throw new UnauthorizedException('Token 已过期');
    }

    // 判断用户是否登录
    const isLogin = await this.isLogin(payload.id);
    if (!isLogin) {
      throw new UnauthorizedException('用户未登录或者Token已过期');
    }

    // 判断用户是否存在
    const user = await this.isExist(payload.id);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return {
      id: payload.id,
    };
  }

  // 查询redis数据库，验证用户是否登陆
  async isLogin(id: string) {
    const user = await this.redis.get(`login_user_${id}`);
    return user;
  }

  // 查询数据库 验证用户id是否存在
  async isExist(id: string) {
    const user = await this.userRepository.findOneBy(id);
    return user;
  }
}
