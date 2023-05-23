import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CMSProviders } from './cms.providers';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [SharedModule, ScheduleModule.forRoot()],
  controllers: [ArticleController, MenuController],
  providers: [ArticleService, MenuService, ...CMSProviders],
})
export class CMSModule {}
