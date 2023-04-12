import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ShareModule } from 'src/shared/shared.module';

@Module({
  imports: [ShareModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
