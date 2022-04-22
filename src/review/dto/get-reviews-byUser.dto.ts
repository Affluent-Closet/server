import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PageRequest } from 'src/common/page/pageRequest';

export class GetReviewsByUser extends PageRequest {
  @IsString()
  @ApiProperty({ type: String, description: '유저 ID' })
  userId: string;
}
