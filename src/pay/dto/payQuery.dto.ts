import { IsNotEmpty } from 'class-validator';

export class PayQueryDto {
  @IsNotEmpty()
  paymentKey: string;

  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  amount: number;
}
