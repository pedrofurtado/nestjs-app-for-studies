import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  //Web-based app (with network listeners)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  //Standalone app (without network listerners. Ex: rabbitmq consumer, cron jobs, etc)
  // const app = await NestFactory.createApplicationContext(AppModule);
  // const appService = app.get(AppService);
  // console.log(appService.getHello());
}

bootstrap();
