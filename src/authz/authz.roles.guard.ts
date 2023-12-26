import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthzRole } from './authz.role.enum';
import { AUTHZ_ROLES_KEY } from './authz.roles.decorator';

@Injectable()
export class AuthzRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AuthzRole[]>(AUTHZ_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      console.log('NAO TEM REQUIRED ROLES PRA ESSA ROTA');
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const hasAccess = requiredRoles.some((role) => user.roles?.includes(role))

    if(hasAccess) { return true }

    throw new HttpException(`Acesso negado, ${user.username} nao tem a role ${JSON.stringify(requiredRoles)}`, 403);
  }
}
