import { PartialType } from '@nestjs/mapped-types';
import { CreateTangshiDto } from './create-tangshi.dto';

export class UpdateTangshiDto extends PartialType(CreateTangshiDto) {}
