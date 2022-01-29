import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { User } from 'shared/interface/user.model';
import { crypt } from 'src/utilities/Utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity  {
  @ApiProperty({ example: '1234' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mesas' })
  @Column('varchar')
  img: string;

  @ApiProperty({ example: 'prueba@gmail.com' })
  @Column({default: null})
  email: string;

  @ApiProperty({ example: 'Sergio' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'Contrasena' })
  @Column({default: null})
  password: string;




  @ApiProperty({ example: 'Mesas' })
  @Column('varchar')
  type: string;

  @ApiProperty({ example: 'Overgrow' })
  @Column({default: null})
  ability: string;

  @ApiProperty({ example: '100' })
  @Column({default: null})
  speed: string;

  @ApiProperty({ example: '150' })
  @Column({default: null})
  weight: string;

  @ApiProperty({ example: '1.80' })
  @Column({default: null})
  height: string;

  @ApiProperty({ example: 'Esto es una descripcion' })
  @Column({length:3000, default: null})
  description: string;














  @BeforeInsert()
  async hashPassword() {
    await crypt(this.password).then((password) => (this.password = password));
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
