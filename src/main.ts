import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enable CORS for all origins
  await app.listen(3000);  // Ensure the server is listening on port 3000
}
bootstrap();