import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Id for entity user',
    type: String,
    example: '1234',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Email for entity user',
    type: String,
    example: 'prueba@gmail.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Name for entity user',
    type: String,
    example: 'Sergio',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Password for entity user',
    type: String,
    example: 'Contrasena',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Surname for entity user',
    type: String,
    example: 'Mesas',
  })
  surname: string;
}