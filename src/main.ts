import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as chalk from 'chalk';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/catch-errors';
import { clerkMiddleware } from '@clerk/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // http logs
  if (process.env.NODE_ENV !== 'production')
    app.use(
      morgan(
        chalk`:date[iso] {red :method} :url {green :status} {blue :response-time ms} - :res[content-length] length`,
      ),
    );
  else
    app.use(
      morgan(
        ':date[iso] :method :url :status :response-time ms - :res[content-length] length',
      ),
    );

  // http logs

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(clerkMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Ikualo Docs API')
    .setDescription('API for Ikualo backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT).then(() => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger running on http://localhost:${PORT}/docs`);
  });
}
bootstrap();
