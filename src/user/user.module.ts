import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserProviders } from './user.providers';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService, ...UserProviders],
})
export class UserModule {}
