import { Module } from '@nestjs/common';
import { CatService } from './services/cat.service';
import { CatController } from './controllers/cat.controller';
import { CatProviders } from './cat.providers';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CatController],
  providers: [CatService, ...CatProviders],
})
export class CatModule {}
