import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ShareModule } from 'src/shared/shared.module';
import { UserProviders } from './user.providers';

@Module({
  imports: [ShareModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
