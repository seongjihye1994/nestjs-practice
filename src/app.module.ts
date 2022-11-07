import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
// 모듈을 생성하면 자동으로 app.module.ts 에 import 된다.

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule], // 설정한 TypeOrmModule을 import 해서 설정파일을 잡아준다.
})

// 모듈을 생성하면 자동으로 app.module.ts 에 import 된다.
// 클라이언트의 요청을 라우팅시키는 역할
// 즉 express 의 app.use('/', require('./routes/user')) 와 동일
export class AppModule {}

// main.ts 에서 생성할 때 이 파일에서 정의 된 데로
// AppModule을 생성함

// 이 앱모듈이 가장 큰 모듈이고
// 하위에 각 기능에 따른 모듈을 생성한다.
// AppModule 아래 USer Module, Orders Module...
// 루트 모듈 아래 하위 모듈은 각각
// controller, entitiy, service, repository 등을 가진다.

// 모듈 생성은 cli 로 진행한다.
// nest g module 모듈이름
// nest : nest cli 를 사용
// g : generate
// module : 모듈을 생성
