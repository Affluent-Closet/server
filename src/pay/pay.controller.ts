import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { PayQueryDto } from './dto/payQuery.dto';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private payService: PayService) {}
  //   @Get()
  //   getPay(@Res() res) {}

  @Get('/success')
  successPay(@Query() req: PayQueryDto) {
    console.log(req);
    return this.payService.successPay(req);
  }
}
