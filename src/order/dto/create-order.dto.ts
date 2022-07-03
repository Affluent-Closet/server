import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  orderName: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  orderNumber: number;

  @IsNotEmpty()
  receiver: string;

  @IsNotEmpty()
  receiverPhoneNum: string;

  @IsNotEmpty()
  payment: string;

  @IsNotEmpty()
  address1: string;

  @IsNotEmpty()
  address2: string;

  request: string;

  @IsNotEmpty()
  goodsId: number;
}
