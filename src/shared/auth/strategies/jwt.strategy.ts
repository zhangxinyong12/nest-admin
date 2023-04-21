// JWT 策略

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 从请求头中获取token 从Authorization头中获取token，请求头要拼接为 Bearer <token>的格式.
      // Authorization: bearer JSON_WEB_TOKEN_STRING.....
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 从请求头中解析token
      // jwtFromRequest: ExtractJwt.fromHeader('token'),
      // 是否忽略过期
      ignoreExpiration: true,
      // 秘钥
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('jwt', payload);
    // 如果 token 已经过期，抛出异常
    // TODO 调整了一下目录结构，结果不走这个方法了，不知道为什么
    if (payload.exp < Date.now() / 1000) {
      console.log('99999999999 Token 已过期');
      throw new UnauthorizedException('Token 已过期');
    }
    return {
      id: payload.id,
    };
  }
}
