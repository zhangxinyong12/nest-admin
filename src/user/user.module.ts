import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ShareModule } from 'src/shared/shared.module';
import { UserProviders } from './user.providers';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ShareModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
