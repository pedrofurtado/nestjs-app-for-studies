import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsMiddleware } from './cats.middleware';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './entities/cat.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    HttpModule,
    ConfigModule,
    SequelizeModule.forFeature([Cat])
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [SequelizeModule]
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CatsMiddleware).forRoutes(CatsController)
  }
}
