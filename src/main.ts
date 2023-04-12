import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加全局的管道
  app.useGlobalPipes(new ValidationPipe());

  // 场景文档
  await generateDocument(app);

  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();
