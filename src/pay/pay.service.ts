import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PayQueryDto } from './dto/payQuery.dto';

@Injectable()
export class PayService {
  tossUrl = 'https://api.tosspayments.com/v1/payments/';
  async successPay(req: PayQueryDto) {
    const { orderId, amount, paymentKey } = req;
    try {
      const pay = await axios.post(this.tossUrl + paymentKey, {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(process.env.TOSS_TEST_KEY + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
        json: {
          orderId: orderId,
          amount: amount,
        },
        responseType: 'json',
      });
      console.log(pay);
      return '성공적으로 구매했습니다.';
    } catch (e) {
      console.log(e);
    }
  }
}
