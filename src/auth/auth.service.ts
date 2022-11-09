import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // 비밀번호 암호화하기
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // 유니크한 salt 를 생성해서 salt와 비밀번호를 합쳐 hash로 암호화한다.

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Existing username`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    // 로그인 시도 회원 정보 db 에서 조회
    const user = await this.userRepository.findOne({ username });

    // 해당 회원이 null이 아니고 입력한 비밀번호와 db에서 조회해온 회원의 비밀번호가 같다면
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success!';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
