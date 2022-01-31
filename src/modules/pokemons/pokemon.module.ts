import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { PokemonController } from './pokemon.controller';
import { PokemonEntity } from './pokemon.entity';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity]), UtilitiesModule],
  providers: [PokemonService],
  controllers: [PokemonController],
  exports: [PokemonService, TypeOrmModule],
})
export class PokemonModule {}
