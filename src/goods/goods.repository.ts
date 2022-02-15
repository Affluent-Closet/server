import { EntityRepository, Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { Goods } from './entities/goods.entity';

//Goods 테이블
@EntityRepository(Goods)
export class GoodsRepository extends Repository<Goods> {
  async createGoods(createGoodsDto: CreateGoodsDto): Promise<Goods> {
    const { category, name, price, discount, stock, detail, thumbnail } =
      createGoodsDto;

    const goods = this.create({
      category,
      name,
      price,
      discount,
      stock,
      detail,
      thumbnail,
      sellnum: 0,
    });

    await this.save(goods);

    return goods;
  }
}
