import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], 
  // 클라이언트의 요청을 라우팅시키는 역할
  // 즉 express 의 app.use('/', require('./routes/user')) 와 동일
  
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// main.ts 에서 생성할 때 이 파일에서 정의 된 데로
// AppModule을 생성함

// 이 앱모듈이 가장 큰 모듈이고
// 하위에 각 기능에 따른 모듈을 생성한다.
// AppModule 아래 USer Module, Orders Module...
