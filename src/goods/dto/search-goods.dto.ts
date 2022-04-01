import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PageRequest } from 'src/common/entities/page/pageRequest';
import { Category } from '../entities/goods.entity';

/** NEW는 신상품순, LOWPRICE는 낮은 상품순, BEST는 많이 팔린순 */
export enum SortMethod {
  NEW = 'NEW',
  LOWPRICE = 'LOWPRICE',
  BEST = 'BEST',
}
export class SearchGoodsDto extends PageRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'ID' })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 카테고리' })
  category?: Category;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 이름' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 가격' })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 할인율' })
  discount?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 재고' })
  stock?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '상품 판매수' })
  sellnum?: number;

  @IsEnum(SortMethod)
  @IsOptional()
  @ApiProperty()
  sortBy?: SortMethod;
}
