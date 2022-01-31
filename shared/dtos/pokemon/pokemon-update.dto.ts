import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePokemonDto {
  @ApiPropertyOptional({
    description: 'Id for entity pokemon',
    type: String,
    example: '1234',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Email for entity pokemon',
    type: String,
    example: 'prueba@gmail.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Name for entity pokemon',
    type: String,
    example: 'Sergio',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Password for entity pokemon',
    type: String,
    example: 'Contrasena',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Surname for entity pokemon',
    type: String,
    example: 'Mesas',
  })
  surname: string;
}