import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 앱 모듈 생성 후
  await app.listen(3000); // 앱 실행
}
bootstrap();

// spring 의 mina 클래스와 동일
// 앱 구동 시 여기서부터 시작

// 1. NestFactory 가 AppModule 을 생성한다.
//    이 AppModule 은 app.module.ts 이다.
//    app.module.ts 에서 정의 된 데로 NestFactory 가 AppModule을 생성한다.

// 2. 이후 해당 앱을 구동한다. -> app.listen
// 3. 클라이언트가 요청한다.
// 4. app.controller.ts 가 해당 요청을 받는다.