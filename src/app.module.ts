import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '../environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { PokemonModule } from './modules/pokemons/pokemon.module';
@Module({
  imports: [
    PokemonModule,
    TypeOrmModule.forRoot({
      ...environment.typeormConfig,
    } as TypeOrmModuleOptions),
    AuthModule
  ],
})
export class AppModule {}
