import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { join } from 'path';

async function bootstrap() {
  //Web-based app (with network listeners)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);

  //Standalone app (without network listerners. Ex: rabbitmq consumer, cron jobs, etc)
  // const app = await NestFactory.createApplicationContext(AppModule);
  // const appService = app.get(AppService);
  // console.log(appService.getHello());

  // MVC (com paginas html)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
}

bootstrap();
