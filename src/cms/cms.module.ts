import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CMSProviders } from './cms.providers';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [SharedModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...CMSProviders],
})
export class CMSModule {}
