import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'ldapjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
  });

  const options = new DocumentBuilder()
    .setTitle('SISPEUC')
    .setDescription(
      'O sistema moderno para aplicação das leis de Parcelamento, Edificação e Utilização Compulsórios da Prefeitura Municipal de São Paulo!',
    )
    .setVersion('versão 2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  const server = createServer();
  server.listen(1389, () => {
    console.log('LDAP server listening at %s', server.url);
  });
}
bootstrap();
