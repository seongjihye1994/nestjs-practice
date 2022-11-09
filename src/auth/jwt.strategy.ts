import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'Secret1234', // 토큰이 유효한 지 체크할 때 사용하는 시크릿키
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰을 어디에서 가져올지 -> header, 토큰 타입은 무엇인지 -> bearer
    });
  }

  async validate(payload) {
    const { username } = payload; // payload에 들어있는 username

    // payload에 들어있는 username으로 DB 조회
    const user: User = await this.userRepository.findOne({ username });

    // 유저가 없으면 에러 리턴
    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // 유저가 있다면 유저 리턴
  }
}

// JwtStrategy 를 사용하기 위해 auth 모듈 providers 에 등록 -> auth 모듈에서 사용
// 다른 모듈에서도 사용하려면 auth 모듈 exports 에도 등록해줌
