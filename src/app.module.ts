import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '../environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      ...environment.typeormConfig,
    } as TypeOrmModuleOptions),
    AuthModule
  ],
})
export class AppModule {}
