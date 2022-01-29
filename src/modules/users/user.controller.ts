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
  import { CreateUserDto } from 'shared/dtos/user/user-create.dto';
  import { GetUserDto } from 'shared/dtos/user/user-get.dto';
  import { UpdateUserDto } from 'shared/dtos/user/user-update.dto';
  import { ApiUrls, ApiUserUrls } from 'shared/enums/api-urls.enum';
import { ControllerAbstract } from 'src/abstracts/abstract.controller';
import { ResponseBuilderService } from 'src/utilities/services/response-builder.service';
import { buildFindOneOptions, decryptPassword } from 'src/utilities/Utils';
  import { FindOneOptions } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
  
  @ApiHeader({
    name: 'Authorization',
    description: 'Jwt generated when user login',
  })
  @ApiTags('user')
  @Controller(ApiUrls.API_URL_USER)
  export class UserController extends ControllerAbstract<UserEntity> {
    lang = 'es';
    constructor(
      private readonly userService: UserService,
      private readonly responseBuilderService: ResponseBuilderService
    ) {
      super();
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Get all Users was successfully completed',
      type: [UserEntity],
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Get all Users failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'User acces token is not present or is invalid',
    })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public findAll(@Headers() headers, @Res() response): Promise<UserEntity[]> {
      return this.userService
        .findAll()
        .then((users) => {
          const usersWithoutPassword: GetUserDto[] = [];
  
          users.forEach((user) => {
            const userWithoutPassword: GetUserDto = {
              id: user.id.toString(),
              img: user.img,
              name: user.name,
              type: user.type,
              ability: user.ability,
              speed: user.speed,
              weight: user.weight,
              height: user.height,
              description: user.description,
              email: user.email
            };
            usersWithoutPassword.push(userWithoutPassword);
          });
  
          return response.status(HttpStatus.OK).json(usersWithoutPassword);
        })
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Get user by property was successfully completed',
      type: UserEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Get user by property failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'User acces token is not present or is invalid',
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
    @Get(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
    public findByPropertie(
      @Headers() headers,
  
      @Param('propertie') propertie: string,
      @Res() response,
    ): Promise<UserEntity> {
      const propertieObject: FindOneOptions = buildFindOneOptions(propertie);
      return this.userService
        .findByPropertie(propertieObject)
        .then((user) => {
          const userWithoutPassword: GetUserDto = {
            id: user.id.toString(),
            img: user.img,
            name: user.name,
            type: user.type,
            ability: user.ability,
            speed: user.speed,
            weight: user.weight,
            height: user.height,
            description: user.description,
            email: user.email
          };
          return response.status(HttpStatus.OK).json(userWithoutPassword);
        })
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Create user was successfully completed',
      type: UserEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Create user failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'User acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'body',
      type: CreateUserDto,
      required: true,
      description: 'User to save on the db',
    })
    @Post()
    public create(
      @Headers() headers,
      @Body() body: CreateUserDto,
      @Res() response,
    ): Promise<UserEntity> {
      body.password = decryptPassword(body.password);
      return this.responseBuilderService.buildPromiseResponse(
        this.userService.create(body),
        response,
        HttpStatus.CREATED,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Delete user was successfully completed',
      type: String,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Delete user failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'User acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id of the user to delete from the db',
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(ApiUserUrls.API_URL_USER_DELETE)
    public delete(
      @Headers() headers,
      @Param('id') userId: number,
      @Res() response,
    ): Promise<UserEntity> {
      return this.responseBuilderService.buildPromiseResponse(
        this.userService.delete(userId),
        response,
        HttpStatus.OK,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  
    @ApiConsumes('application/json')
    @ApiOkResponse({
      status: 200,
      description: 'Update user was successfully completed',
      type: UserEntity,
    })
    @ApiForbiddenResponse({
      status: 403,
      description: 'Update user failed',
    })
    @ApiUnauthorizedResponse({
      status: 401,
      description: 'User acces token is not present or is invalid',
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id of the user to update',
    })
    @ApiParam({
      name: 'body',
      type: UpdateUserDto,
      required: true,
      description: 'User data modified',
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(ApiUserUrls.API_URL_USER_UPDATE)
    public update(
      @Headers() headers,
      @Param('id') id: number,
      @Body() body: UpdateUserDto,
      @Res() response,
    ): Promise<UserEntity> {
      const propertieObject: FindOneOptions = buildFindOneOptions(`${id}`);
      if (body?.password) {
        body.password = decryptPassword(body?.password);
      }
      return this.responseBuilderService.buildPromiseResponse(
        this.userService.update(propertieObject, body),
        response,
        HttpStatus.OK,
        HttpStatus.FORBIDDEN,
        headers['Accept-Language']
      );
    }
  }
  