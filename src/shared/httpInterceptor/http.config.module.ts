import { HttpModule } from '@nestjs/axios';
import { Module, LoggerService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { configModuleOptions } from '../configs/module-options';
import { AppLoggerModule } from '../logger/logger.module';
import { AppLogger } from '../logger/logger.service';
import transformRequest from './transformRequest';
import transformResponse from './transformResponse';

@Module({
  // 导入其他模块 依赖
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(configModuleOptions),
    AuthModule,
    HttpModule.registerAsync({
      imports: [AppLoggerModule],
      useFactory: (logger: AppLogger) => ({
        timeout: 5000, // 请求超时时间
        maxRedirects: 5, // 最大重定向次数
        // 请求拦截
        transformRequest: (data, headers) =>
          transformRequest(logger, data, headers),

        // 响应拦截
        transformResponse: (data) => transformResponse(logger, data),
      }),
      inject: [AppLogger],
    }),
  ],

  // 暴露出去 供其他模块使用
  exports: [HttpModule],
  // 本模块内部提供的服务 供本模块内部使用
  providers: [],
})
export class HttpConfigModule {}
