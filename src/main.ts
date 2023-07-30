import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ValidationError } from '@nestjs/class-validator';
import { ResponseTransformationInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (error: ValidationError[]) => {
        console.log(error);
        throw new HttpException(
          error[0].constraints[Object.keys(error[0].constraints).pop()],
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseTransformationInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
