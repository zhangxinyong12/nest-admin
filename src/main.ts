import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { BaseExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
import { AppLogger } from './shared/logger/logger.service';
const { APP_PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 添加全局的管道
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false, // 允许不能识别的值
    }),
  );

  const appLogger = await app.resolve<AppLogger>(AppLogger);
  // 添加请求日志中间件
  app.use((req, res, next) => {
    appLogger.logRequest(req);
    next();
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  // TODO 造成接口响应变慢？记录了太多垃圾信息
  app.useGlobalFilters(
    new BaseExceptionsFilter(appLogger),
    new HttpExceptionFilter(appLogger),
  );

  // 场景文档
  await generateDocument(app);

  const uploadDir =
    !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
      ? process.env.UPLOAD_DIR
      : join(__dirname, '../../..', 'static/upload');

  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload',
  });

  await app.listen(APP_PORT);
  console.log(`http://localhost:${APP_PORT}`);
}
bootstrap();
