import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])], // BoardRepository 사용을 위한 모듈 임포트

  // board 컨트롤러를 생성하면 board.mudule.ts 에 자동으로 업데이트됨
  controllers: [BoardsController],

  // 컨트롤러를 제외한 서비스, 리포지토리는 프로바이더(종속성 주입)에 기재됨
  providers: [BoardsService],
})
// 즉, boards 컨트롤러를 먼저 생성하고
// 해당 boards 컨트롤러를 사용하기 위해
// board Module 에 등록해줌
export class BoardsModule {}

// cli로 명령어 입력해서 controller 만드는 순서
// 1. 터미널에 nest g controller boards --no--spec 입력
// 2. cli 는 먼저 boards 폴더를 찾음
// 3. boards 폴더 안에 controller 파일 생성
// 4. boards 폴더 안에 module 파일 찾음
// 5. module 파일 안에다가 생성한 controller 넣어줌
// 생성한 컨트롤러를 사용하기 위해 module 파일에 등록
