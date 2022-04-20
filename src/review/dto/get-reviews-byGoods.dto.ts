import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PageRequest } from 'src/common/page/pageRequest';

export class GetReivewsByGoodsDto extends PageRequest {
  @IsString()
  @ApiProperty({ type: Number, description: '상품 ID' })
  goodsId: number;
}
