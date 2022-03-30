import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageRequest } from 'src/common/entities/page/pageRequest';
import { Category } from '../entities/goods.entity';

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
}
