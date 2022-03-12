import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateGoodsDto } from './create-goods.dto';

export class UploadImageGoodsDTO extends OmitType(CreateGoodsDto, [
  'detail',
] as const) {
  @IsNotEmpty()
  images: Express.Multer.File[];
}
