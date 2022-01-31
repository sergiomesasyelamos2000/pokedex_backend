import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty({
    description: 'Email for entity pokemon',
    type: String,
    example: 'prueba@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Name for entity pokemon',
    type: String,
    example: 'Sergio',
  })
  name: string;

  @ApiProperty({
    description: 'Password for entity pokemon',
    type: String,
    example: 'Contrasena',
  })
  password: string;





  @ApiProperty({
    description: 'Img for entity pokemon',
    type: String,
    example: 'Mesas',
  })
  img: string;

  @ApiProperty({
    description: 'Surname for entity pokemon',
    type: String,
    example: 'Mesas',
  })
  type: string;

  @ApiProperty({
    description: 'Abilities for entity pokemon',
    type: String,
    example: 'Overgrow',
  })
  ability: string;

  @ApiProperty({
    description: 'Speed for entity pokemon',
    type: String,
    example: '80',
  })
  speed: string;

  @ApiProperty({
    description: 'Weight for entity pokemon',
    type: String,
    example: '100',
  })
  weight: string;

  @ApiProperty({
    description: 'Height for entity pokemon',
    type: String,
    example: '100',
  })
  height: string;

  @ApiProperty({
    description: 'Description for entity pokemon',
    type: String,
    example: 'This is a description',
  })
  description: string;
}