import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private payService: PayService) {}
  //   @Get()
  //   getPay(@Res() res) {}

  @Get('/success')
  successPay(@Req() req) {
    console.log(req);
    return this.payService.successPay(req);
  }
}
