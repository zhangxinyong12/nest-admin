import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';

@Module({
  // 注入Config
  imports: [ConfigModule.forRoot(configModuleOptions)],

  // 暴露Config
  exports: [ConfigModule, ...DatabaseProviders],
  providers: [...DatabaseProviders],
})
export class ShareModule {}
