import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  //이름에 포함된 공백제거
  @Transform((parmas) => parmas.value.trim())
  //비밀번호는 이름과 같은 문자열을 포함할수없게 함
  //여기서 value는 name => value.trim()는 이름으로 받은 스트링에서 공백을 제거한 스트링
  @Transform(({ value, obj }) => {
    if (obj.password.includes(value.trim())) {
      throw new BadRequestException(
        'password는 name과 같은 문자열을 포함할 수 없습니다.',
      );
    }
    return value.trim();
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  //사용자 패스워드는 영문대소문자와 숫자 또는 특수문자(!, @, #, $, %, ^, &, *, (, ))로 이루어진 8자 이상 30자 이하의 문자열이어야 한다.
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
