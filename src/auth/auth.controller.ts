import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // 테스트 시 유저 정보가 없으므로 Guards 미들웨어를 사용해 유저 정보를 빌림?
  // AuthGuard 를 이용하면 요청 안에 유저 정보를 넣어줄 수 있음 + 인증에 대한 미들웨어 처리 -> 토큰이 없거나 잘못된 토큰이라면 오류를 알려줌
  test(@Req() req) {
    console.log('req', req);
  }
}

// Nest js의 여러가지 미들웨어
// 1. Pipes : 컨트롤러에 도착 하기 전 클라이언트의 요청 데이터를 유효성 체크함
// 2. Guards : 인증 미들웨어. 지정된 경로로 통과할 수 있는 사람과 허용 안되는 사람을 서버에서 알려줌
// 등등

// 각각의 미들웨어가 불러지는 순서
// 미들웨어 -> guard(인증미들웨어) -> 인터셉터 (before) -> pipe -> 컨트롤러 ->
// 서비스 -> 컨트롤러 -> 인터셉터 (after) -> filter (if applicable) -> client
