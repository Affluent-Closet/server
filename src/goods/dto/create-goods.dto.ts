import { IsNotEmpty } from 'class-validator';
import { Category } from '../entities/goods.entity';

export class CreateGoodsDto {
  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  detail: string[];

  @IsNotEmpty()
  thumbnail: string;

  sellnum: number;
}
