import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Goods extends BaseEntity {
  // 상품 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 상품 카테고리
  @Column()
  category: string;

  // 상품 이름
  @Column()
  name: string;

  // 상품 가격
  @Column()
  price: string;

  // 상품 할인율
  @Column()
  discount: number;

  // 상품 재고
  @Column()
  stock: number;

  // 상품 상세정보
  @Column()
  detail: string[];

  // 상품 썸네일
  @Column()
  thumbnail: string;

  // 상품 판매수
  @Column()
  sellnum: number;

  //생성시간
  @Column()
  createAt: Date;
}
