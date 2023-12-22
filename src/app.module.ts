import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './app.configuration';
import { Cat } from './cats/entities/cat.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsService } from './cronjobs/cronjobs.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CatsModule,
    ConfigModule.forRoot({ load: [configuration] }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Cat],
      define: {
        timestamps: false
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronjobsService],
})
export class AppModule {}
