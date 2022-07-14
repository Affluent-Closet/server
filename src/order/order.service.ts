import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import { Goods } from 'src/goods/entities/goods.entity';
import { GoodsService } from 'src/goods/goods.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderGoods } from './entities/orderGoods.entity';
import { OrderRepository } from './order.repository';
import { OrderGoodsRepository } from './orderGoods.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(OrderGoodsRepository)
    private orderGoodsRepository: OrderGoodsRepository,
    private goodsService: GoodsService,
    private userService: UserService,
  ) {}

  /**주문 생성 */
  async createOrder(createOrderDto: CreateOrderDto) {
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
      orderGoodsDataArr,
    } = createOrderDto;
    /**주문한 유저 찾기 */
    const findUser = await this.userService.getUserInfo(userId);
    // 주문 상품 제외한 나머지 정보 먼저 저장
    const order = await this.orderRepository.create({
      orderName,
      orderNumber,
      user: findUser,
      receiver,
      receiverPhoneNum,
      payment,
      address1,
      address2,
      request,
    });
    const orderGoodsArr = [];
    orderGoodsDataArr.map(async (orderGoodsData) => {
      /**주문한 상품 찾기  */
      //주문한 상품 목록안에 있는 아이디들로 상품 정보를 모두 가져옴
      const findGoods = await this.goodsService.getGoodsById(
        orderGoodsData.goodsId,
      );
      const createNewOrderGoodsData = {
        goods: findGoods,
        count: orderGoodsData.count,
        orderPrice: orderGoodsData.orderPrice,
      };
      /**주문 상품 만들기 */
      //주문상품 배열을 만들어서 위에서 만든 찾은 상품 배열로 각각 주문상품을 만들어서 넣어줌
      //주문 상품에는 상품, 결제 금액, 수량 이 들어가야함
      const newOrderGoods = await this.orderGoodsRepository.createOrderGoods(
        createNewOrderGoodsData,
      );
      newOrderGoods.order = order;
      await this.orderGoodsRepository.save(newOrderGoods);
      orderGoodsArr.push(newOrderGoods);
    });
    order.orderGoods = orderGoodsArr;
    await this.orderRepository.save(order);
    return order.id;
  }
}
