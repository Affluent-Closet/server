import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsService } from 'src/goods/goods.service';
import { UserService } from 'src/user/user.service';
import { CreateReviewDto } from './dto/create-review.dto';
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
    console.log(user);
    const goods = await this.goodsService.getGoodsById(goodsId);
    console.log(goods);
    return this.reviewRepository.createReview(createReviewDto, goods, user);
  }
}
