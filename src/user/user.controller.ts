import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.createUser(createUserDto);
  }

  @Post('/email-verify')
  //이메일 인증시 URL에 포함되어 전달되는 쿼리 파라미터를 @Query 데코레이터와 함께 선언한 DTO로 받는다.
  async verifyEmail(@Query() verifyEmaildto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = verifyEmaildto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
    return await this.userService.login(userLoginDto);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<User> {
    return await this.userService.getUserInfo(userId);
  }
}
