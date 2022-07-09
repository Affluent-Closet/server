import { Goods } from 'src/goods/entities/goods.entity';
import { EntityRepository, Repository } from 'typeorm';
import { OrderGoods } from './entities/orderGoods.entity';

interface createOrderGoodsData {
  goods: Goods;
  count: number;
  orderPrice: number;
}

@EntityRepository(OrderGoods)
export class OrderGoodsRepository extends Repository<OrderGoods> {
  createOrderGoods(data: createOrderGoodsData) {
    const orderGoods = this.create({ ...data });
    return orderGoods;
  }
}
