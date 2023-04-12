import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';

@Module({
  // 注入Config
  imports: [ConfigModule.forRoot(configModuleOptions)],

  // 暴露Config
  exports: [ConfigModule],
})
export class ShareModule {}
