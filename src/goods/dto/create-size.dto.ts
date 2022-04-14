import { IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  size: string;
}
