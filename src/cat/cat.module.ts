import { Module } from '@nestjs/common';
import { CatService } from './services/cat.service';
import { CatController } from './controllers/cat.controller';
import { CatProviders } from './cat.providers';
import { ShareModule } from 'src/shared/shared.module';

@Module({
  imports: [ShareModule],
  controllers: [CatController],
  providers: [CatService, ...CatProviders],
})
export class CatModule {}
