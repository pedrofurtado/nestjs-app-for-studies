import { SetMetadata } from '@nestjs/common';
import { AuthzRole } from './authz.role.enum';

export const AUTHZ_ROLES_KEY = 'authz_roles';
export const AuthzRoles = (...roles: AuthzRole[]) => SetMetadata(AUTHZ_ROLES_KEY, roles);
