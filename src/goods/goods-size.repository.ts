import { EntityRepository, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { Size } from './entities/goods-size.entity';

@EntityRepository(Size)
export class GoodsSizeRepository extends Repository<Size> {
  async createGoodsSize(createSizeDto: CreateSizeDto, id: number) {
    console.log({ ...createSizeDto, id });
    const size = this.create({ ...createSizeDto, id });
    await this.save(size);
    return size;
  }
}
