import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsSizeRepository } from 'src/goods/goods-size.repository';
import { GoodsModule } from 'src/goods/goods.module';
import { GoodsRepository } from 'src/goods/goods.repository';
import { GoodsService } from 'src/goods/goods.service';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  imports: [
    UserModule,
    GoodsModule,
    TypeOrmModule.forFeature([
      ReviewRepository,
      UserRepository,
      GoodsRepository,
      GoodsSizeRepository,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, GoodsService, UserService],
})
export class ReviewModule {}
