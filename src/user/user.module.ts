import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ShareModule } from 'src/shared/shared.module';
import { UserProviders } from './user.providers';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ShareModule,
    JwtModule.registerAsync({
      inject: [ConfigService], // 注入 ConfigService
      imports: [ShareModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
    }),
  ],
  controllers: [UserController, RoleController, AuthController],
  providers: [UserService, RoleService, ...UserProviders, AuthService],
})
export class UserModule {}
