import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiUrls } from 'shared/enums/api-urls.enum';
import { AppModule } from './app.module';
import { cargarPokemon } from './modules/pokemons/insertDtoPokemon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ApiUrls.BASE);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Login REST API')
    .setDescription('API REST for Login APP')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);


  
// Poner a true si quieres cargar los pokemons del Excel
if(false){
  cargarPokemon();
}
}
bootstrap();
