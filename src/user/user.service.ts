import {
  ClassSerializerInterceptor,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcryptjs';

export interface emailValidateData {
  user: User;
  accessToken: string;
}

@Injectable()
export class UserService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /**유저 생성함수 */
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '다른 유저와 중복된 이메일입니다.',
      );
    }
    /** 비밀번호 암호화에 필요한 salt변수 */
    const salt = await bcrypt.genSalt();
    /** 암호화된 비밀번호 */
    const hashedPassword = await bcrypt.hash(password, salt);
    /** jwt 토큰에 들어갈 서명부분 */
    const signupVerifyToken = uuid.v1();
    const newcreateUserdto = {
      ...createUserDto,
      password: hashedPassword,
      signupVerifyToken,
    };
    try {
      await this.saveUser(newcreateUserdto);
      await this.sendMemberJoinEmail(email, signupVerifyToken);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  //기존에 있던 유저인지 먼저 확인
  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findOne({ email: emailAddress });

    return user !== undefined;
  }

  //사용자를 디비에 저장
  private async saveUser(newcreateUserdto: CreateUserDto) {
    const user = this.userRepository.create({ ...newcreateUserdto });

    await this.userRepository.save(user);
  }

  /**인증 이메일 보내기 */
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /**이메일 인증 */
  async verifyEmail(signupVerifyToken: string) {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    const user = await this.userRepository.findOne({ signupVerifyToken });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    const accessToken = this.authService.getCookieWithJwtAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user,
      accessToken,
    };
  }

  async login(userLoginDto: UserLoginDto) {
    // TODO
    const { email, password } = userLoginDto;
    /** 비밀번호 암호화에 필요한 salt변수 */
    // 1. email을 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(
        '유저가 존재하지 않습니다. 이메일을 다시한번 확인하세요',
      );
    }
    // 2. 찾은 유저와 비밀번호가 같은지를 확인하고 JWT를 발급
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = this.authService.getCookieWithJwtAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        user,
        accessToken,
      };
    } else {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 비밀번호를 다시한번 확인하세요',
      );
    }
  }

  async getUserInfo(userId: string): Promise<User> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    console.log(this.userRepository);

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    // 2. 조회된 데이터를 User 타입으로 응답
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    const updatedUser = this.userRepository.create({
      id: userId,
      email: user.email,
      ...updateUserDto,
    });

    await this.userRepository.save(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete({ id: userId });

    //id로 찾은 데이터가 디비에 없을 때
    if (result.affected === 0) {
      throw new NotFoundException(
        `${userId}로 찾은 유저가 DB에 없습니다. id를 다시 한번 확인해 주세요.`,
      );
    }
  }

  /**Refresh 토큰 암호화 해서 저장 */
  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }

  /**리프레시 토큰 */
  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.getUserInfo(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: string) {
    return this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
