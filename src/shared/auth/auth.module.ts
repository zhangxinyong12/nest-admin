import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseProviders } from '../database.providers';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService], // 注入 ConfigService
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('jwt');
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...DatabaseProviders,
    ...AuthProviders,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [...DatabaseProviders, JwtStrategy],
})
export class AuthModule {}
