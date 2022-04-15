import { EntityRepository, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { Size } from './entities/goods-size.entity';
import { Goods } from './entities/goods.entity';

@EntityRepository(Size)
export class GoodsSizeRepository extends Repository<Size> {
  async createGoodsSize(createSizeDto: CreateSizeDto, goods: Goods) {
    console.log({ ...createSizeDto, goods });
    const size = this.create({ ...createSizeDto, goods });
    await this.save(size);
    return size;
  }
}
