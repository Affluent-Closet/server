import { Body, Controller, Post } from '@nestjs/common';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { Goods } from './entities/goods.entity';
import { GoodsService } from './goods.service';

//@Controller안의 'goods'가 localhost:3000/goods를 의미함
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  //(Post) localhost:3000/goods
  @Post('')
  createGoods(@Body() createGoodsDto: CreateGoodsDto): Promise<Goods> {
    return this.goodsService.createGoods(createGoodsDto);
  }
}
