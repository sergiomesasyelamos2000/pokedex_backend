import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/utilities/services/crud.service';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';

@Injectable()
export class PokemonService extends CrudService<PokemonEntity> {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonsRepository: Repository<PokemonEntity>,
  ) {
    super(pokemonsRepository);
  }
}
