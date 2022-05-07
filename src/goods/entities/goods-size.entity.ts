import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity()
@Unique(['id'])
export class SizeInfo {
  /**사이즈 id */
  @PrimaryGeneratedColumn()
  id: number;

  /** 상품 재고 */
  @Column()
  stock: number;

  /**상품 사이즈 */
  @Column()
  size: string;

  /**상품 정보 */
  @ManyToOne((type) => Goods, (goods) => goods.sizeInfo, { eager: false })
  goods: Goods;
}
