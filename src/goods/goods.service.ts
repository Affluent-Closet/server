import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UploadImageGoodsDTO } from './dto/uploadImage-goods.dto';
import { Goods } from './entities/goods.entity';
import { GoodsRepository } from './goods.repository';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsRepository)
    private goodsRepository: GoodsRepository,
  ) {}

  //goods 생성
  createGoods(createGoodsDto: CreateGoodsDto): Promise<Goods> {
    return this.goodsRepository.createGoods(createGoodsDto);
  }

  //모든 goods 가져오기
  async getAllGoods(): Promise<Goods[]> {
    const goods = this.goodsRepository.find();
    return goods;
  }

  //특정 goods 가져오기
  async getGoodsById(id: number): Promise<Goods> {
    const found = this.goodsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(
        `${id}로 요청한 상품을 찾을 수 없습니다. 아이디를 다시 한번 확인해 주세요.`,
      );
    }

    return found;
  }

  async updateGoods(
    id: number,
    updateGoodsDto: UploadImageGoodsDTO,
  ): Promise<Goods> {
    const goods = await this.getGoodsById(id);

    const updatedGoods = this.goodsRepository.create({ id, ...updateGoodsDto });

    await this.goodsRepository.save(updatedGoods);

    return goods;
  }

  async deleteGoods(id: number): Promise<void> {
    const result = await this.goodsRepository.delete({ id });

    //id로 찾은 데이터가 디비에 없을 때
    if (result.affected === 0) {
      throw new NotFoundException(
        `${id}로 찾은 goods가 DB에 없습니다. id를 다시 한번 확인해 주세요.`,
      );
    }
  }
}
