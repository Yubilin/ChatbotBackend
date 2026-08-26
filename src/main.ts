import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // se crea la app como NestExpressApplication para poder
  // servir archivos estáticos la interfaz gráfica del chatbot
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // habilita CORS para que el frontend pueda consumir el chatbot
  app.enableCors();

  // sirve la carpeta public/ en la raíz del servidor.
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
