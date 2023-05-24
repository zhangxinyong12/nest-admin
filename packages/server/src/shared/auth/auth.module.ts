import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserProviders } from 'src/user/user.providers';
import { DatabaseProviders } from '../database.providers';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

const CreateJwtModule = JwtModule.registerAsync({
  inject: [ConfigService], // 注入 ConfigService
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return configService.get('jwt');
  },
});

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CreateJwtModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
    }),
  ],
  controllers: [],
  providers: [
    ...DatabaseProviders,
    ...UserProviders,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CreateJwtModule],
})
export class AuthModule {}
