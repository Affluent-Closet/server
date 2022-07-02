import { IsArray } from 'class-validator';
import { type } from 'os';
import { Base } from 'src/common/entities/base.entity';
import { OrderGoods } from 'src/order/entities/orderGoods.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SizeInfo } from './goods-size.entity';

export enum Category {
  OUTER = 'OUTER',
  SHIRTS = 'SHIRTS',
  SHOES = 'SHOES',
  KNIT = 'KNIT',
  PANTS = 'PANTS',
}

@Entity()
@Unique(['id'])
export class Goods extends Base {
  // 상품 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 상품 카테고리
  @Column()
  category: Category;

  // 상품 이름
  @Column()
  name: string;

  // 상품 가격
  @Column()
  price: number;

  // 상품 할인율
  @Column()
  discount: number;

  // 상품 재고
  // @Column()
  // stock: number;

  // 상품 상세정보
  @Column('text', { array: true })
  @IsArray()
  detail: string[];

  // 상품 썸네일
  @Column()
  thumbnail: string;

  // 상품 판매수
  @Column()
  sellnum: number;

  /**사이즈 */
  @OneToMany((type) => SizeInfo, (size) => size.goods, {
    eager: true,
  })
  sizeInfo: SizeInfo[];

  /**상품 리뷰 */
  @OneToMany((type) => Review, (review) => review.goods, {
    eager: false,
  })
  review: Review[];

  /**주문 상품 */
  @OneToMany((type) => OrderGoods, (orderGoods) => orderGoods.goods)
  orderGoods: OrderGoods;
}
