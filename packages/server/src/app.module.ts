import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { SharedModule } from 'src/shared/shared.module';
import { CMSModule } from './cms/cms.module';
import { NewsModule } from './news/news.module';
import { TangshiModule } from './tangshi/tangshi.module';
import { BookUserModule } from './books/user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    CatModule,
    CMSModule,
    NewsModule,
    TangshiModule,
    BookUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
