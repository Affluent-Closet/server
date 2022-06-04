import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/page/page';
import { GoodsService } from 'src/goods/goods.service';
import { UserService } from 'src/user/user.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReivewsByGoodsDto } from './dto/get-reviews-byGoods.dto';
import { GetReviewsByUser } from './dto/get-reviews-byUser.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    private goodsService: GoodsService,
    private userService: UserService,
  ) {}
  async createReview(createReviewDto: CreateReviewDto) {
    const { goodsId, userId } = createReviewDto;
    const user = await this.userService.getUserInfo(userId);
    const goods = await this.goodsService.getGoodsById(goodsId);
    return this.reviewRepository.createReview(createReviewDto, goods, user);
  }

  async getReviewsByGoods(page: GetReivewsByGoodsDto) {
    const { goodsId } = page;
    const foundGoods = await this.goodsService.getGoodsById(goodsId);
    const total = await this.reviewRepository.count({ goods: foundGoods });
    const reviews = await this.reviewRepository.find({
      where: { goods: goodsId },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, reviews);
  }

  async getReviewsByUser(page: GetReviewsByUser) {
    const { userId } = page;
    const foundUser = await this.userService.getUserInfo(userId);
    const total = await this.reviewRepository.count({ user: foundUser });
    const reviews = await this.reviewRepository.find({
      where: { user: userId },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, reviews);
  }

  //특정 id를 가진 review 가져오기
  async getReviewById(id: number) {
    // const found = await this.goodsRepository.findOne(id);
    const query = await this.reviewRepository.createQueryBuilder('goods');
    query.where('goods.id = :id', { id: id });
    const found = query.getOne();

    if (!found) {
      throw new NotFoundException(
        `${id}로 요청한 리뷰를 찾을 수 없습니다. 아이디를 다시 한번 확인해 주세요.`,
      );
    }

    return found;
  }

  async updateReview(reviewId: number, updateReviewDto: UpdateReviewDto) {
    const updatedReview = this.reviewRepository.create({
      id: reviewId,
      ...updateReviewDto,
    });

    await this.reviewRepository.save(updatedReview);

    return updatedReview;
  }

  async deleteReview(id: number) {
    const result = await this.reviewRepository.delete({ id });

    //id로 찾은 데이터가 디비에 없을 때
    if (result.affected === 0) {
      throw new NotFoundException(
        `${id}로 찾은 review가 DB에 없습니다. id를 다시 한번 확인해 주세요.`,
      );
    }
  }

  /**상품 리뷰 별점 통계 함수,
  1. 리턴값으로 전체 별점이랑 각 별점 별로 개수도 보내줘야함
  2. 상품아이디로 리뷰를 찾고 그 리뷰들의 별점을 전부 가져와서 통계를 함
  */
  async getGoodsRating(goodsId: GetReivewsByGoodsDto) {
    /**상품 아이디로 리뷰 찾기 */
    const reviews = await this.getReviewsByGoods(goodsId);
    const countPoint = {
      onePoint: 0,
      twoPoint: 0,
      threePoint: 0,
      fourPoint: 0,
      fivePoint: 0,
    };

    /**리뷰 안의 별점 총점 계산 */
    const rating = reviews.items
      .map((review) => review.rating)
      .reduce((prev, curr) => prev + curr, 0);

    /**전체 별점 */
    const totoalRating = rating / reviews.items.length;

    /**리뷰 안의 각 별점 갯수 계산 */
    reviews.items.map((review) => {
      switch (review.rating) {
        case 1:
          countPoint.onePoint++;
          break;
        case 2:
          countPoint.twoPoint++;
          break;
        case 3:
          countPoint.threePoint++;
          break;
        case 4:
          countPoint.fourPoint++;
          break;
        case 5:
          countPoint.fivePoint++;
          break;
        default:
          break;
      }
    });
    return { countPoint, totoalRating };
  }
}
