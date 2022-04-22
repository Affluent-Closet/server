import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { CreateSizeDto } from './dto/create-size.dto';
import { SearchGoodsDto } from './dto/search-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './entities/goods.entity';
import { GoodsService } from './goods.service';

//@Controller안의 'goods'가 localhost:3000/goods를 의미함
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  //(Post) localhost:3000/goods
  //상품정보 생성
  @Post('')
  createGoods(@Body() createGoodsDto: CreateGoodsDto): Promise<Goods> {
    return this.goodsService.createGoods(createGoodsDto);
  }

  /**상품 사이즈 생성 */
  // 상품 정보를 id로 받아와서 size안에 넣어주는게 필요함
  @Post('/size')
  createGoodsSize(@Body() createSizeDto: CreateSizeDto) {
    return this.goodsService.createGoodsSize(createSizeDto);
  }

  //(Get) localhost:3000/goods
  //모든 상품 정보 불러오기
  @Get('')
  searchGoods(@Query() page: SearchGoodsDto) {
    return this.goodsService.searchGoods(page);
  }

  //(Get) localhost:3000/goods/:id
  //상품 한개 정보 불러오기
  @Get('/:id')
  getGoodsById(@Param('id', ParseIntPipe) id: number): Promise<Goods> {
    return this.goodsService.getGoodsById(id);
  }

  //(Post) localhost:3000/goods/:id/update
  //제품 업데이트 하기
  @Post('/:id/update')
  updateGoods(
    @Param('id') id: number,
    @Body() updateGoodsDto: UpdateGoodsDto,
  ): Promise<Goods> {
    return this.goodsService.updateGoods(id, updateGoodsDto);
  }

  @Delete('/:id')
  deleteGoods(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.deleteGoods(id);
  }
}
