import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/page/page';
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
    const { sortBy, category } = page;
    let total;
    let found;
    const query = await this.goodsRepository.createQueryBuilder('goods');
    if (!category) {
      //category가 비어있을때
      total = await this.goodsRepository.count();
      this.getPagination(query, page);
    } else {
      //category가 들어있을 때
      /**카테고리에 알맞은 데이터 전체 갯수 세기 */
      total = await this.goodsRepository.count({ category });
      found = await this.getPaginationByCategory(page, category);
    }
    if (!sortBy) {
      //sortBy가 비어있으면 분류를 안함
    } else {
      switch (sortBy) {
        case SortMethod.BEST:
          this.getHighSalesOrderGoods(query);
          break;
        case SortMethod.LOWPRICE:
          this.getLowPriceOrderGoods(query);
          break;
        case SortMethod.NEW:
          this.getNewOrderGoods(query);
          break;
        default:
          break;
      }
    }

    if (!category) {
      found = await query.getMany();
    }
    return new Page(total, page.pageSize, found);
  }

  /**카테고리에 따른 페이지네이션*/
  async getPaginationByCategory(page, category) {
    const goods = await this.goodsRepository.find({
      where: { category },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return goods;
  }
  /**카테고리 없이 페이지네이션 */
  getPagination(query, page) {
    query.take(page.getLimit());
    query.skip(page.getOffset());
  }

  //낮은 가격순으로 정렬
  getLowPriceOrderGoods(query) {
    query.orderBy('goods.price', 'ASC');
  }

  //판매량 많은순으로 정렬
  getHighSalesOrderGoods(query) {
    query.orderBy('goods.sellnum', 'DESC');
  }

  //신상품순
  getNewOrderGoods(query) {
    query.orderBy('goods.created_at', 'DESC');
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
