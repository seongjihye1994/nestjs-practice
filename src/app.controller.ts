import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 클라이언트가 / 을 요청하면
  @Get()
  getHello(): string {
    return this.appService.getHello(); // appService 의 getHello 메소드를 호출하며 리턴
  }
}

// main.ts 에서 앱모듈 생성 후 실행
// 이후 이 컨트롤러에서 클라이언트의 요청을 받음

// 서비스에서 로직을 처리한 후 컨트롤러에 리턴하면
// 해당 리턴 값을 지지고 볶아서 컨트롤러에 응답