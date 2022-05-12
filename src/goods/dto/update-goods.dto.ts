import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateGoodsDto } from './create-goods.dto';

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) {
  @IsNotEmpty()
  sellnum?: number;
}
