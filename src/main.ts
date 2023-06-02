import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MovieModule } from './controllers/movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(MovieModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);

  await app.listen(3000);
}
bootstrap();
