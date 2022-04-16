import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}
  async createReview(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.createReview(createReviewDto);
  }
}
