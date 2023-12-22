import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UsersModule],
  exports: [AuthGuard],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
