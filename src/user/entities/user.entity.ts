import { Base } from 'src/common/entities/base.entity';
import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
@Unique(['id'])
export class User extends Base {
  //자동으로 uuid 넣어서 생성해줌
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;
}
