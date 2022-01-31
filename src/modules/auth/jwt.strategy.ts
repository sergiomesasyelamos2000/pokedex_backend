import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'shared/interface/jwt-payload.model';
import { buildFindOneOptions } from 'src/utilities/Utils';
import { PokemonService } from '../pokemons/pokemon.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private pokemonService: PokemonService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sistemas',
    });
  }

  async validate(payload: JwtPayload) {
    const pokemon = this.pokemonService.findByPropertie(
      buildFindOneOptions(`id:${payload.pokemonId}`),
    );
    if (!pokemon) {
      throw new HttpException('error_pokemon_not_valid', HttpStatus.FORBIDDEN);
    }
    return pokemon;
  }
}
