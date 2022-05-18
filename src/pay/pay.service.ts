import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PayQueryDto } from './dto/payQuery.dto';

@Injectable()
export class PayService {
  tossUrl = 'https://api.tosspayments.com/v1/payments/';
  async successPay(payquerydto: PayQueryDto) {
    console.log('payquerydto', payquerydto);
    const { orderId, amount, paymentKey } = payquerydto;
    try {
      const pay = await axios.post(
        this.tossUrl + paymentKey,
        {
          orderId: orderId,
          amount: amount,
        },
        {
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(process.env.TOSS_TEST_KEY + ':').toString('base64'),
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('pay', pay);
      return {
        title: '성공적으로 구매했습니다',
        // amount: response.body.totalAmount,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
