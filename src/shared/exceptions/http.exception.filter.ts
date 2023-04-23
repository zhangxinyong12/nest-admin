import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from 'src/shared/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();

    const req = ctx.getRequest();
    const method = req.method;
    const headers = req.headers;
    const body = req.body;
    const params = req.params;
    const ip = req.ip;
    const userAgent = headers['user-agent'];
    let message = exception.getResponse() as any;
    // 401 登录过期
    if (
      status === 401 &&
      (exception.getResponse() as any).message === 'Unauthorized'
    ) {
      status = 302;
      message = '登录过期';
    }
    this.logger.error(null, 'HttpError', {
      method,
      path: request.url,
      headers,
      body,
      params,
      ip,
      userAgent,
      status,
      request: request.params,
      response: exception.getResponse(),
    });

    return response.status(200).send({
      code: status,
      success: false,
      message: message.message || message.error || '服务器错误',
    });
  }
}
