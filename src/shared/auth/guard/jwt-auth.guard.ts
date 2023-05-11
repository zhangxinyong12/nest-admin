import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { PERMISSIONS_KEY } from '../decorator/permissions.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // 权限控制
    const permissions: string[] = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('permissions', permissions);

    if (permissions && permissions.length && Array.isArray(permissions)) {
      const request = context.switchToHttp().getRequest();
      const url = request.route.path;
      const token = request.headers.authorization.replace('Bearer ', ''); // 获取请求头中的 token
      const decodedToken = this.jwtService.verify(token);
      const userPermissions = decodedToken?.permissions?.role || [];
      console.log('decodedToken', decodedToken);
      if (!permissions.some((el) => userPermissions.includes(el))) {
        throw new UnauthorizedException(`没有权限访问${url}`);
      }
    }

    return super.canActivate(context);
  }
}
