import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/page/page';
import { Like } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { SearchGoodsDto, SortMethod } from './dto/search-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
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
  async getAllGoods(page: SearchGoodsDto) {
    //쿼리로 category가 들어있으면 카테고리에 맞는것들만 가져와야함
    const { sortBy, category, name } = page;
    console.log(page);
    /**total : 물품갯수 카운트, sortObj : 분류기준 , found : 찾은 물풀들 */
    let total, sortObj, found;
    if (!sortBy) {
      //sortBy가 비어있으면 분류를 안함
    } else {
      switch (sortBy) {
        case SortMethod.BEST:
          sortObj = { sellnum: 'DESC' };
          break;
        case SortMethod.LOWPRICE:
          sortObj = { price: 'ASC' };
          break;
        case SortMethod.NEW:
          sortObj = { createdAt: 'DESC' };
          break;
      }
    }

    if (!category) {
      //category가 비어있을때
      total = await this.goodsRepository.count();
      found = await this.getPagination(page, sortObj, name);
    } else {
      //category가 들어있을 때
      /**카테고리에 알맞은 데이터 전체 갯수 세기 */
      total = await this.goodsRepository.count({ category });
      found = await this.getPaginationByCategory(page, category, sortObj, name);
    }
    return new Page(total, page.pageSize, found);
  }

  /**카테고리에 따른 페이지네이션*/
  async getPaginationByCategory(page, category, sortObj, name) {
    console.log(category);
    console.log(sortObj);
    const goods = await this.goodsRepository.find({
      where: { category, name: Like(`%${name}%`) },
      take: page.getLimit(),
      skip: page.getOffset(),
      order: sortObj,
    });
    return goods;
  }
  /**카테고리 없이 페이지네이션 */
  async getPagination(page, sortObj, name) {
    console.log(sortObj);
    const goods = await this.goodsRepository.find({
      where: { name: Like(`%${name}%`) },
      take: page.getLimit(),
      skip: page.getOffset(),
      order: sortObj,
    });
    return goods;
  }

  //특정 id를 가진 goods 가져오기
  async getGoodsById(id: number): Promise<Goods> {
    // const found = this.goodsRepository.findOne(id);
    const query = await this.goodsRepository.createQueryBuilder('goods');
    query.where('goods.id = :id', { id: id });
    const found = query.getOne();

    if (!found) {
      throw new NotFoundException(
        `${id}로 요청한 상품을 찾을 수 없습니다. 아이디를 다시 한번 확인해 주세요.`,
      );
    }

    return found;
  }

  async updateGoods(
    id: number,
    updateGoodsDto: UpdateGoodsDto,
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
