import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { BookUserProviders } from './user.providers';

@Module({
  imports: [SharedModule],

  controllers: [UserController],
  providers: [UserService, ...BookUserProviders],
})
export class BookUserModule {}
