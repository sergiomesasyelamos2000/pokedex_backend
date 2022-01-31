import { ApiProperty } from '@nestjs/swagger';

export class GetPokemonDto {
  @ApiProperty({
    description: 'Id for entity pokemon',
    type: String,
    example: '1234',
  })
  id: string;

  @ApiProperty({
    description: 'Email for entity pokemon',
    type: String,
    example: 'prueba@gmail.com',
  })
  email: string;




  @ApiProperty({
    description: 'Img for entity pokemon',
    type: String,
    example: 'Sergio',
  })
  img: string;

  @ApiProperty({
    description: 'Name for entity pokemon',
    type: String,
    example: 'Sergio',
  })
  name: string;

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
    example: '100',
  })
  description: string;
}
