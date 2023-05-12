import {
  LoggerService,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { UploadService } from './upload/upload.service';
import { AuthModule } from './auth/auth.module';
import { CaptchaService } from './captcha/captcha.service';
import { HttpModule } from '@nestjs/axios';
import { AppLogger } from './logger/logger.service';
import { HttpConfigModule } from './httpInterceptor/http.config.module';

@Module({
  // 导入其他模块 依赖
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(configModuleOptions),
    AuthModule,
    HttpConfigModule,
  ],

  // 暴露出去 供其他模块使用
  exports: [
    ConfigModule,
    AppLoggerModule,
    ...DatabaseProviders,
    UploadService,
    AuthModule,
    CaptchaService,
    HttpConfigModule,
  ],
  // 本模块内部提供的服务 供本模块内部使用
  providers: [...DatabaseProviders, UploadService, CaptchaService],
})
export class SharedModule {}
