import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsSizeRepository } from './goods-size.repository';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './goods.repository';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsRepository, GoodsSizeRepository])],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService, TypeOrmModule],
})
export class GoodsModule {}
