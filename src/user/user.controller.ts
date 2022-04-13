import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { emailValidateData, UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/authGuard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.createUser(createUserDto);
  }

  @Post('/email-verify')
  //이메일 인증시 URL에 포함되어 전달되는 쿼리 파라미터를 @Query 데코레이터와 함께 선언한 DTO로 받는다.
  async verifyEmail(
    @Query() verifyEmaildto: VerifyEmailDto,
  ): Promise<emailValidateData> {
    const { signupVerifyToken } = verifyEmaildto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<emailValidateData> {
    return await this.userService.login(userLoginDto);
  }

  @Auth(['ANY'])
  // @UseGuards(AuthGuard)
  @Get('/:id')
  getUserInfo(@Param('id') userId: string): Promise<User> {
    console.log(userId);
    //UserService를 통해 유저 정보를 가져와서 응답으로 돌려줍니다.
    return this.userService.getUserInfo(userId);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/update')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
