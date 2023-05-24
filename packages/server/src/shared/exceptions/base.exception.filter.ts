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

    // 一般都是请求http 内部发生错误
    this.logger.error(null, 'NotHttpError', {
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
    console.log(new ServiceUnavailableException());

    // 非 HTTP 标准异常的处理。
    return response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      code: HttpStatus.SERVICE_UNAVAILABLE,
      success: false,
      message: new ServiceUnavailableException().getResponse(),
    });
  }
}
