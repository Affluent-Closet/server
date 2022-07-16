import { type } from 'os';
import { Base } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderGoods } from './orderGoods.entity';

@Entity('orders')
export class Order extends Base {
  /**주문 아이디 */
  @PrimaryGeneratedColumn()
  id: number;

  /**주문 이름 */
  @Column()
  orderName: string;

  /**주문자 아이디 */
  @ManyToOne((type) => User, (user) => user.order)
  user: User;

  /**주문 번호 */
  @Column()
  orderNumber: number;

  /**수령자 */
  @Column()
  receiver: string;

  /**수령자 연락처 */
  @Column()
  receiverPhoneNum: string;

  /**결제 수단 */
  @Column()
  payment: string;

  /**주소 */
  @Column()
  address1: string;

  /**상세 주소 */
  @Column()
  address2: string;

  /**요청 사항 */
  @Column()
  request: string;

  /**주문 상품 */
  @OneToMany((type) => OrderGoods, (orderGoods) => orderGoods.order, {
    eager: true,
    cascade: true,
  })
  orderGoods: OrderGoods[];

  static of(params: Partial<Order>): Order {
    const order = new Order();

    Object.assign(order, params);

    return order;
  }
}
