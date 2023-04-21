import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CreateJwtModule],
})
export class AuthModule {}
