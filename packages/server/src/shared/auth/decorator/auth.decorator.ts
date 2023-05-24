import { SetMetadata } from '@nestjs/common';

// 使用 SetMetadata 装饰器工厂函数创建一个自定义装饰器。
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * @description:  不校验登录的路由
 *
 */

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
