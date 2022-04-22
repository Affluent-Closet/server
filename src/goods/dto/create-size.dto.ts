import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  goodsId: number;
}
