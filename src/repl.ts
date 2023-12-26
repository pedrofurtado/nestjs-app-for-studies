import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();

// to start repl (equivalent to rails console), run:
// npm run start -- --entryFile repl
