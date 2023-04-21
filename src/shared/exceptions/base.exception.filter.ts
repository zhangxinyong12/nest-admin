import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from 'src/shared/logger/logger.service';

// 不一定是http错误，可能是代码逻辑错误
@Catch()
export class BaseExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const req = ctx.getRequest();
    const method = req.method;
    const headers = req.headers;
    const body = req.body;
    const params = req.params;
    const ip = req.ip;
    const userAgent = headers['user-agent'];

    this.logger.error(null, 'HttpExceptionFilter', {
      method,
      path: request.url,
      headers,
      body,
      params,
      ip,
      userAgent,
      request: request.params,
      response: new ServiceUnavailableException().getResponse(),
    });

    // 非 HTTP 标准异常的处理。
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      code: HttpStatus.SERVICE_UNAVAILABLE,
      success: false,
      message: new ServiceUnavailableException().getResponse(),
    });
  }
}
