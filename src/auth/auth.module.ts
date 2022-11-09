import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234', // JWT 토큰 만들 때 이용하는 시크릿 텍스트 (아무거나)
      signOptions: {
        expiresIn: 60 * 60, // JWT 만료시간
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // quth 모듈 내부에서 사용하기 위해 providers에 등록
  exports: [JwtStrategy, PassportModule], // 다른 모듈에서 사용하기 위해 export에 등록
})
export class AuthModule {}
