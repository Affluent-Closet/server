import { EntityRepository, Repository } from 'typeorm';
import { OrderGoods } from './entities/orderGoods.entity';

@EntityRepository(OrderGoods)
export class OrderGoodsRepository extends Repository<OrderGoods> {}
