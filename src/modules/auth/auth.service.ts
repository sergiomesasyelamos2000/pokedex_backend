import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'shared/interface/jwt-payload.model';
import { UserEntity } from 'src/modules/users/user.entity';
import { UserService } from 'src/modules/users/user.service';
import { buildFindOneOptions } from 'src/utilities/Utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    if (!user) {
      throw new HttpException('error_user_not_valid', HttpStatus.FORBIDDEN);
    }
    return await user.validatePassword(password);
  }

  async generateAccessToken(email: string) {
    const user: UserEntity = await this.usersService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    const jwtPayload: JwtPayload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}