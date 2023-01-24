import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      keys: ['ask me for information'],
    }),
  );
  await app.listen(3000);
}
bootstrap();
