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
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // 导入其他模块 依赖
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(configModuleOptions),
    AuthModule,
    HttpConfigModule,
    // 使用mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_MONGODB_URL'), // url 中已经包含了。下面2个貌似无用
        user: configService.get<string>('DB_MONGODB_USER'), //
        pass: configService.get<string>('DB_MONGODB_PASS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
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
    // MongooseModule,
  ],
  // 本模块内部提供的服务 供本模块内部使用
  providers: [...DatabaseProviders, UploadService, CaptchaService],
})
export class SharedModule {}
