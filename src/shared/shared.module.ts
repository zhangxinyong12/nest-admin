import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { UploadService } from './upload/upload.service';
import { AuthModule } from './auth/auth.module';

@Module({
  // 注入Config
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(configModuleOptions),
    AuthModule,
  ],

  // 暴露Config
  exports: [
    ConfigModule,
    AppLoggerModule,
    ...DatabaseProviders,
    UploadService,
    AuthModule,
  ],
  providers: [...DatabaseProviders, UploadService],
})
export class SharedModule {}
