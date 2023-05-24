import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * 删除敏感信息
 */
@Injectable()
export class RemoveSensitiveInfoInterceptor implements NestInterceptor {
  removeKeys: string[] = [];
  constructor(removeKeys: string[]) {
    this.removeKeys = removeKeys;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('RemoveSensitiveInfoInterceptor:')
    // console.log(`Controller: ${context.getClass().name}`); // 输出
    // console.log(`Method: ${context.getHandler().name}`);
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((res) => {
        res = JSON.parse(JSON.stringify(res));
        this.removeKeys.forEach((key) => {
          this.delValue(res, key);
        });
        return res;
      }),
    );
  }

  delValue(data, targetKey) {
    for (const key in data) {
      if (key === targetKey) {
        delete data[key];
        break;
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        this.delValue(data[key], targetKey);
      }
    }
  }
}
