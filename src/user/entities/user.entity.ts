import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Base } from 'src/common/entities/base.entity';
import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('User')
@Unique(['id'])
export class User extends Base {
  //자동으로 uuid 넣어서 생성해줌
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String, required: false, description: '사용자 UUID' })
  id: string;

  @Column({ length: 30 })
  @ApiProperty({ type: String, description: '사용자 이름' })
  @IsString()
  name: string;

  @Column({ length: 60, unique: true })
  @ApiProperty({ type: String, description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @Column({ length: 30 })
  @ApiProperty({ type: String, description: '사용자 암호' })
  password: string;

  @Column({ length: 60 })
  @ApiProperty({ type: String, description: 'jwt 토큰의 verify signature' })
  signupVerifyToken: string;

  @Column({ type: 'enum', enum: Role })
  @ApiProperty({ enum: Role, description: '사용자 권한' })
  @IsEnum(Role)
  role: Role;

  @Column()
  phoneNumber: string;

  @Column()
  profileImg: string;
}
