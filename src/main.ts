import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config({ path: '.env' });

async function bootstrap() {
  // Create an instance of the Nest application using the AppModule
  const app = await NestFactory.create(AppModule);

  // Set up global validation for incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: true, // Skip validation for undefined properties
    }),
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
