import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(User) private userRepository: UserRepository,
    private connection: Connection,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '다른 유저와 중복된 이메일입니다.',
      );
    }
    const signupVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  //기존에 있던 유저인지 먼저 확인
  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findOne({ email: emailAddress });

    return user !== undefined;
  }

  //사용자를 디비에 저장
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
  }

  //인증 이메일 보내기
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

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    const user = await this.userRepository.findOne({ signupVerifyToken });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(userLoginDto: UserLoginDto): Promise<string> {
    // TODO
    const { email, password } = userLoginDto;
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    const user = await this.userRepository.findOne({ email, password });
    // 2. JWT를 발급
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async getUserInfo(userId: string): Promise<User> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리

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
}
