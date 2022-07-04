import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    EmailModule,
    AuthModule,
    UserService,
    TypeOrmModule,
    UserService,
    UserRepository,
  ],
})
export class UserModule {}
