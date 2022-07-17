import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { type } from 'os';
import { Base } from 'src/common/entities/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

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
  @Exclude()
  id: string;

  @Column({ length: 30 })
  @ApiProperty({ type: String, description: '사용자 이름' })
  @IsString()
  name: string;

  @Column({ length: 60, unique: true })
  @ApiProperty({ type: String, description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty({ type: String, description: '사용자 암호' })
  @Exclude()
  password: string;

  @Column({ length: 60 })
  @ApiProperty({ type: String, description: 'jwt 토큰의 verify signature' })
  signupVerifyToken: string;

  @Column({ type: 'enum', enum: Role })
  @ApiProperty({ enum: Role, description: '사용자 권한' })
  @IsEnum(Role)
  role: Role;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  phoneNumber: string;

  @Column()
  profileImg: string;

  /**리프레쉬 토큰 발급여부 확인하는 항목 */
  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  /**유저가 작성한 리뷰 id */
  @OneToMany((type) => Review, (review) => review.user)
  review: Review[];

  /**유저가 주문한 내용 */
  @OneToMany((type) => Order, (order) => order.user)
  order: Order[];
}
