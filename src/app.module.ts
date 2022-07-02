import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './configs/typeorm.config';
import { GoodsModule } from './goods/goods.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseModule } from './purchase/purchase.module';
import { ReviewModule } from './review/review.module';
import { PayModule } from './pay/pay.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    GoodsModule,
    ImageModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    EmailModule,
    AuthModule,
    PurchaseModule,
    ReviewModule,
    PayModule,
    OrderModule,
  ],
  providers: [EmailService],
})
export class AppModule {}
