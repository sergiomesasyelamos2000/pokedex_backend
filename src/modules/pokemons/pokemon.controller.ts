import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import {
    ApiConsumes,
    ApiForbiddenResponse,
    ApiHeader,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CreatePokemonDto } from 'shared/dtos/pokemon/pokemon-create.dto';
import { GetPokemonDto } from 'shared/dtos/pokemon/pokemon-get.dto';
import { UpdatePokemonDto } from 'shared/dtos/pokemon/pokemon-update.dto';
import { ApiPokemonUrls, ApiUrls } from 'shared/enums/api-urls.enum';
import { ControllerAbstract } from 'src/abstracts/abstract.controller';
import { ResponseBuilderService } from 'src/utilities/services/response-builder.service';
import { buildFindOneOptions, decryptPassword } from 'src/utilities/Utils';
  import { FindOneOptions } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonService } from './pokemon.service';
  
  @ApiHeader({
    name: 'Authorization',
    description: 'Jwt generated when pokemon login',
  })
  @ApiTags('pokemon')
  @Controller(ApiUrls.API_URL_POKEMON)
  export class PokemonController extends ControllerAbstract<PokemonEntity> {
    lang = 'es';
    constructor(
      private readonly pokemonService: PokemonService,
      private readonly responseBuilderService: ResponseBuilderService
    ) {
      super();
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Get all pokemons was successfully completed',
      type: [PokemonEntity],
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Get all pokemons failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'Pokemon acces token is not present or is invalid',
    })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public findAll(@Headers() headers, @Res() response): Promise<PokemonEntity[]> {
      return this.pokemonService
        .findAll()
        .then((pokemons) => {
          const pokemonsWithoutPassword: GetPokemonDto[] = [];
  
          pokemons.forEach((pokemon) => {
            const pokemonWithoutPassword: GetPokemonDto = {
              id: pokemon.id.toString(),
              img: pokemon.img,
              name: pokemon.name,
              type: pokemon.type,
              ability: pokemon.ability,
              speed: pokemon.speed,
              weight: pokemon.weight,
              height: pokemon.height,
              description: pokemon.description,
              email: pokemon.email
            };
            pokemonsWithoutPassword.push(pokemonWithoutPassword);
          });
  
          return response.status(HttpStatus.OK).json(pokemonsWithoutPassword);
        })
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Get pokemon by property was successfully completed',
      type: PokemonEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Get pokemon by property failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'Pokemon acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'propertie',
      type: String,
      example: 'email:hello@world.com',
      required: true,
      description:
        "Param extracted from URL, it's used has a filter in the query to db",
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(ApiPokemonUrls.API_URL_POKEMON_BY_PROPERTIE)
    public findByPropertie(
      @Headers() headers,
  
      @Param('propertie') propertie: string,
      @Res() response,
    ): Promise<PokemonEntity> {
      const propertieObject: FindOneOptions = buildFindOneOptions(propertie);
      return this.pokemonService
        .findByPropertie(propertieObject)
        .then((pokemon) => {
          const pokemonWithoutPassword: GetPokemonDto = {
            id: pokemon.id.toString(),
            img: pokemon.img,
            name: pokemon.name,
            type: pokemon.type,
            ability: pokemon.ability,
            speed: pokemon.speed,
            weight: pokemon.weight,
            height: pokemon.height,
            description: pokemon.description,
            email: pokemon.email
          };
          return response.status(HttpStatus.OK).json(pokemonWithoutPassword);
        })
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Create pokemon was successfully completed',
      type: PokemonEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Create pokemon failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'pokemon acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'body',
      type: CreatePokemonDto,
      required: true,
      description: 'pokemon to save on the db',
    })
    @Post()
    public create(
      @Headers() headers,
      @Body() body: CreatePokemonDto,
      @Res() response,
    ): Promise<PokemonEntity> {
      body.password = decryptPassword(body.password);
      return this.responseBuilderService.buildPromiseResponse(
        this.pokemonService.create(body),
        response,
        HttpStatus.CREATED,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Delete pokemon was successfully completed',
      type: String,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Delete pokemon failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'pokemon acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id of the pokemon to delete from the db',
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(ApiPokemonUrls.API_URL_POKEMON_DELETE)
    public delete(
      @Headers() headers,
      @Param('id') pokemonId: number,
      @Res() response,
    ): Promise<PokemonEntity> {
      return this.responseBuilderService.buildPromiseResponse(
        this.pokemonService.delete(pokemonId),
        response,
        HttpStatus.OK,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Update pokemon was successfully completed',
      type: PokemonEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Update pokemon failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'pokemon acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id of the pokemon to update',
    })
    @ApiParam({
      name: 'body',
      type: UpdatePokemonDto,
      required: true,
      description: 'pokemon data modified',
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(ApiPokemonUrls.API_URL_POKEMON_UPDATE)
    public update(
      @Headers() headers,
      @Param('id') id: number,
      @Body() body: UpdatePokemonDto,
      @Res() response,
    ): Promise<PokemonEntity> {
      const propertieObject: FindOneOptions = buildFindOneOptions(`${id}`);
      if (body?.password) {
        body.password = decryptPassword(body?.password);
      }
      return this.responseBuilderService.buildPromiseResponse(
        this.pokemonService.update(propertieObject, body),
        response,
        HttpStatus.OK,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  }
  