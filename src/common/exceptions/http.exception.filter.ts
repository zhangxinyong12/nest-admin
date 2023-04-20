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
    const status = exception.getStatus();

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
      status,
      request: request.params,
      response: exception.getResponse(),
    });

    response.status(status).send({
      code: status,
      success: false,
      message: exception.getResponse(),
    });
  }
}
