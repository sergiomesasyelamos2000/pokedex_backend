import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'shared/interface/jwt-payload.model';
import { buildFindOneOptions } from 'src/utilities/Utils';
import { PokemonEntity } from '../pokemons/pokemon.entity';
import { PokemonService } from '../pokemons/pokemon.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly pokemonsService: PokemonService,
    private readonly jwtService: JwtService,
  ) {}

  async validatePokemon(email: string, password: string): Promise<boolean> {
    const pokemon = await this.pokemonsService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    if (!pokemon) {
      throw new HttpException('error_pokemon_not_valid', HttpStatus.FORBIDDEN);
    }
    return await pokemon.validatePassword(password);
  }

  async generateAccessToken(email: string) {
    const pokemon: PokemonEntity = await this.pokemonsService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    const jwtPayload: JwtPayload = { pokemonId: pokemon.id };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}