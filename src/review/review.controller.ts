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
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReivewsByGoodsDto } from './dto/get-reviews-byGoods.dto';
import { GetReviewsByUser } from './dto/get-reviews-byUser.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('')
  @Auth(['ANY'])
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

  @Post(':/id/update')
  updateReview(
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @Delete('/:id')
  deleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.deleteReview(id);
  }
}
