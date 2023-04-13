import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';
// 不限制监听数量
process.setMaxListeners(0);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局的管道
  app.useGlobalPipes(new ValidationPipe());

  // 异常过滤器
  // app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 场景文档
  await generateDocument(app);

  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();
