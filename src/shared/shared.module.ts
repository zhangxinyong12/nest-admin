import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { UploadService } from './upload/upload.service';

@Module({
  // 注入Config
  imports: [AppLoggerModule, ConfigModule.forRoot(configModuleOptions)],

  // 暴露Config
  exports: [ConfigModule, AppLoggerModule, ...DatabaseProviders, UploadService],
  providers: [...DatabaseProviders, UploadService],
})
export class ShareModule {}
