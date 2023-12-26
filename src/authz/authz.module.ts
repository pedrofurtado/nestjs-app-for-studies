import { Module } from '@nestjs/common';
import { AuthzRolesGuard } from './authz.roles.guard';

@Module({
  imports: [],
  exports: [AuthzRolesGuard],
  providers: [AuthzRolesGuard],
  controllers: [],
})
export class AuthzModule {}
