import { IsNotEmpty } from 'class-validator';
import { Gender } from '../entities/review.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  img: string[];

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  goodsId: number;
}
