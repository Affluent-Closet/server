import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { GoodsSizeRepository } from 'src/goods/goods-size.repository';
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
      GoodsSizeRepository,
      UserRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    GoodsService,
    UserService,
    EmailService,
    AuthService,
  ],
})
export class OrderModule {}
