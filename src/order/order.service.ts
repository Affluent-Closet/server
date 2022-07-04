import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsService } from 'src/goods/goods.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private goodsService: GoodsService,
    private userService: UserService,
  ) {}

  /**주문 생성 */
  async createOrder(createOrder: CreateOrderDto) {
    const {
      orderName,
      userId,
      orderNumber,
      receiver,
      receiverPhoneNum,
      payment,
      address1,
      address2,
      request,
      goodsId,
    } = createOrder;
  }
}
