import { IsArray } from 'class-validator';
import { Base } from 'src/common/entities/base.entity';
import { Goods } from 'src/goods/entities/goods.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity()
@Unique(['id'])
export class Review extends Base {
  /**리뷰 id */
  @PrimaryGeneratedColumn()
  id: number;

  /**리뷰 사진 */
  @Column('text', { array: true })
  @IsArray()
  img: string[];

  /**리뷰 텍스트 */
  @Column('text', { array: true })
  @IsArray()
  detail: string;

  /**키 */
  @Column()
  height: number;

  /**몸무게 */
  @Column()
  weight: number;

  /**별점 */
  @Column()
  rating: number;

  /**성별 */
  @Column()
  gender: Gender;

  /**리뷰 상품id */
  @ManyToOne((type) => Goods, (goods) => goods.review, { eager: true })
  goods: Goods;

  /**리뷰 작성한 유저id */
  @ManyToOne((type) => User, (user) => user.review, { eager: false })
  user: User;
}
