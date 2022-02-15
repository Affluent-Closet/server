import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './goods.repository';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsRepository])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
