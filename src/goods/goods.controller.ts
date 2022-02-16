import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  //(Get) localhost:3000/goods
  @Get('')
  getAllGoods(): Promise<Goods[]> {
    return this.goodsService.getAllGoods();
  }

  //(Get) localhost:3000/goods/:id
  @Get('/:id')
  getGoodsById(@Param('id', ParseIntPipe) id: number): Promise<Goods> {
    return this.goodsService.getGoodsById(id);
  }

  // @Post('/:id/update')
  // updateGoods(
  //   @Param('id') id:number,
  //   @Body('goods')
  // ):Promise<Goods>{
  //   return this.goodsService.updateGoods(id, )
  // }

  @Delete('/:id')
  deleteGoods(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.deleteGoods(id);
  }
}
