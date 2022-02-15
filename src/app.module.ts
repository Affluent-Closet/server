import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './configs/typeorm.config';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMconfig), GoodsModule],
})
export class AppModule {}
