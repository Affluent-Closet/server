import { Test, TestingModule } from '@nestjs/testing';
import { GoodsRepository } from 'src/goods/goods.repository';
import { GoodsService } from 'src/goods/goods.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Order } from 'src/order/entities/order.entity';
import { OrderRepository } from 'src/order/order.repository';
import { OrderService } from 'src/order/order.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

describe('OrderService Test', () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;
  let goodsService: GoodsService;
  let goodsRepository: GoodsRepository;
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        OrderRepository,
        GoodsService,
        GoodsRepository,
        UserService,
        UserRepository,
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  describe('createOrder', () => {
    it('주문과 주문상품을 생성하고, 생성한 주문을 반환한다.', async () => {
      const orderName = '테스트용 주문';
      const userId = 'ea69a0b8-b74b-4a78-9558-c727dc4e79cc';
      const orderNumber = 2;
      const receiver = '이지호';
      const receiverPhoneNum = '0101321343';
      const payment = '신용카드';
      const address1 = '서울';
      const address2 = '영등포구';
      const request = '부재시 경비실 앞에 놔주세요';
      const orderGoodsDataArr = [
        {
          goodsId: 2,
          count: 1,
          orderPrice: 10000,
        },
        {
          goodsId: 3,
          count: 2,
          orderPrice: 60000,
        },
        {
          goodsId: 4,
          count: 4,
          orderPrice: 85000,
        },
      ];

      const requestDto: CreateOrderDto = {
        orderName: orderName,
        userId: userId,
        orderNumber: orderNumber,
        receiver: receiver,
        receiverPhoneNum: receiverPhoneNum,
        payment: payment,
        address1: address1,
        address2: address2,
        request: request,
        orderGoodsDataArr: orderGoodsDataArr,
      };

      const createdOrderEntity = Order.of(requestDto);
      const savedOrder = Order.of({
        id: 8,
        orderName: orderName,
        orderNumber: orderNumber,
        receiver: receiver,
        receiverPhoneNum: receiverPhoneNum,
        payment: payment,
        address1: address1,
        address2: address2,
        request: request,
      });

      const orderRepositoryCreateSpy = jest
        .spyOn(orderRepository, 'create')
        .mockReturnValue(createdOrderEntity);

      //   const orderRepositorySaveSpy = jest
      //     .spyOn(orderRepository, 'save')
      //     .mockReturnValue(savedOrder);

      const result = await orderService.createOrder(requestDto);

      expect(orderRepositoryCreateSpy).toBeCalledWith(requestDto);
      //   expect(orderRepositorySaveSpy).toBeCalledWith(createdOrderEntity);
      expect(result).toBe(savedOrder);
    });
  });
});
