import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// 컨트롤러가 서비스의 메소드를 호출한다.
// 이후 서비스에서 로직을 처리한 후 컨트롤러로 리턴한다.
