import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
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
