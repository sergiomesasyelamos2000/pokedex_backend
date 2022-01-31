import { ApiProperty } from '@nestjs/swagger';

export class PokemonLoginDto {
  @ApiProperty({
    description: 'Email for entity pokemon',
    type: String,
    example: 'hello@world.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for entity pokemon',
    type: String,
    example: 'P@ssw0rd',
  })
  password: string;
}
