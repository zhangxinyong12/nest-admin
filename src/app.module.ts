import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, UserModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
