import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

//이메일은 변경하면 안되므로 특정 컬럼은 제외하고 나머지를 전부 상속받는 OmitType을 사용
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
] as const) {}
