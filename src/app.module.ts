import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { SharedModule } from 'src/shared/shared.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [SharedModule, UserModule, CatModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
