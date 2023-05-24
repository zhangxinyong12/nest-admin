import { Module } from '@nestjs/common';
import { TangshiService } from './tangshi.service';
import { TangshiController } from './tangshi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { TangShi, TangShiSchema } from './schemas/tangshi.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: TangShi.name, schema: TangShiSchema }]),
  ],
  controllers: [TangshiController],
  providers: [TangshiService],
})
export class TangshiModule {}
