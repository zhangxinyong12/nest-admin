import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';

@Module({
  // 注入Config
  imports: [AppLoggerModule, ConfigModule.forRoot(configModuleOptions)],

  // 暴露Config
  exports: [ConfigModule, AppLoggerModule, ...DatabaseProviders],
  providers: [...DatabaseProviders],
})
export class ShareModule {}
