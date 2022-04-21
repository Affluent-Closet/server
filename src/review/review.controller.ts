import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReivewsByGoodsDto } from './dto/get-reviews-byGoods.dto';
import { GetReviewsByUser } from './dto/get-reviews-byUser';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    await this.reviewService.createReview(createReviewDto);
  }

  @Get('/goods')
  async getReviewsByGoods(@Query() page: GetReivewsByGoodsDto) {
    return this.reviewService.getReviewsByGoods(page);
  }

  @Get('/user')
  async getReviewsByUser(@Query() page: GetReviewsByUser) {
    return this.reviewService.getReviewsByUser(page);
  }
}
