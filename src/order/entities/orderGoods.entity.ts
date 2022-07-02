import { type } from 'os';
import { Base } from 'src/common/entities/base.entity';
import { Goods } from 'src/goods/entities/goods.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderGoods extends Base {
  /**주문상품 아이디 */
  @PrimaryGeneratedColumn()
  id: number;

  /**상품 id 한번에 여러개 담을 수 있다.*/
  @ManyToOne((type) => Goods, (goods) => goods.orderGoods)
  goods: Goods;

  /**주문 당시의 가격 (정가 말고 쿠폰같은거 먹였을때 최종 가격) */
  @Column()
  orderPrice: number;

  /**구매 수량 */
  @Column()
  count: number;

  /**주문 아이디 */
  @ManyToOne((type) => Order, (order) => order.orderGoods)
  order: Order;
}
