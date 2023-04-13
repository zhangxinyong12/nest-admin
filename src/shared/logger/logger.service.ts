import { Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports, format } from 'winston';

type RequestContext = Record<string, any>;

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      level: process.env.LOGGER_LEVEL || 'info', // 默认日志级别
      format: format.combine(format.timestamp(), format.prettyPrint()),

      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  // 错误日志
  error(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.error({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  // 警告日志
  warn(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.warn({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  //
  debug(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.debug({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  // 信息日志
  verbose(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.verbose({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }
  //
  log(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.info({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }
}
