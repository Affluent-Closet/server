import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsRepository } from 'src/goods/goods.repository';
import { GoodsService } from 'src/goods/goods.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderGoodsRepository } from './orderGoods.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderGoodsRepository,
      GoodsRepository,
      UserRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, GoodsService, UserService],
})
export class OrderModule {}
