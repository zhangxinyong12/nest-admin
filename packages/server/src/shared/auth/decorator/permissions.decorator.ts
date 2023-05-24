import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 *
 * @description 权限控制 例如，@Permissions('admin', 'user') 将把 ['admin', 'user'] 分配给路由处理程序。
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
