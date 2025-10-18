import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(Number(process.env.PORT ?? 3001));
}
void bootstrap();
