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
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    await this.reviewService.createReview(createReviewDto);
  }

  @Get('/goods')
  async getReviewsByGoods() {
    return this.reviewService.getReviewsByGoods();
  }
}
