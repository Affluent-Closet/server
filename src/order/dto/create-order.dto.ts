import { IsNotEmpty } from 'class-validator';
import { number } from 'joi';

interface orderGoodsData {
  goodsId: number;
  count: number;
  orderPrice: number;
}

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

  /**주문 상품은 여러 종류가 될수 있음 */
  @IsNotEmpty()
  orderGoodsDataArr: orderGoodsData[];
}
