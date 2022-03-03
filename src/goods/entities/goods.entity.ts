import { IsArray } from 'class-validator';
import { Base } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum Category {
  PANTS = 'pants',
  SHIRTS = 'shirts',
  SHOES = 'shoes',
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
  @Column()
  stock: number;

  // 상품 상세정보
  @Column({ array: true })
  @IsArray()
  detail: string;

  // 상품 썸네일
  @Column()
  thumbnail: string;

  // 상품 판매수
  @Column()
  sellnum: number;
}
