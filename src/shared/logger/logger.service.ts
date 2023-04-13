import { Injectable, Scope } from '@nestjs/common';
import dayjs from 'dayjs';
import { createLogger, Logger, transports, format } from 'winston';
const { combine, timestamp, printf } = format;
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
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          // zippedArchive: true, // 压缩
          maxsize: 1024 * 1024 * 10, // 大小
          maxFiles: 5, // 最大文件数
        }),
        new transports.File({
          filename: 'logs/combined.log',
          // zippedArchive: true,
          maxsize: 1024,
          maxFiles: 5,
        }),
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
