import { EntityRepository, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { SizeInfo } from './entities/goods-size.entity';
import { Goods } from './entities/goods.entity';

@EntityRepository(SizeInfo)
export class GoodsSizeRepository extends Repository<SizeInfo> {
  async createGoodsSize(createSizeDto: CreateSizeDto, goods: Goods) {
    const size = this.create({ ...createSizeDto, goods });
    await this.save(size);
    return size;
  }
}
