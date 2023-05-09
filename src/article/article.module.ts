import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ArticleProviders } from './article.providers';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [SharedModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...ArticleProviders],
})
export class ArticleModule {}
