import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType 是 NestJS 中的一个 utility 类，它可以帮助我们快速创建一个新的类，该类具有与指定类相同的属性，但这些属性都是可选的。
export class UpdateUserDto extends PartialType(CreateUserDto) {}
