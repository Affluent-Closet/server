import { Goods } from 'src/goods/entities/goods.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async createReview(
    createReviewDto: CreateReviewDto,
    goods: Goods,
    user: User,
  ) {
    const newReivew = { ...createReviewDto, goods, user };
    console.log('newReview', newReivew);
    const review = await this.create({
      ...newReivew,
    });
    await this.save(review);
    return review;
  }
}
