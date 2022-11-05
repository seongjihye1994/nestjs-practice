import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {

    // boardController 는 boardsService를 DI
    constructor(private boardsService: BoardsService) {}
    // 이 때 private 을 붙이지 않으면 에러남 -> boardsService 를 멤버 변수로 빼줘야 에러 해결
    // 근대 타입 스크립트는 private 을 기재해주면 에러 안남

    // boardsService 를 DI 해줬기 때문에
    // boardsService 에 있는 핸들러를 사용할 수 있음
    
    // 게시물 모두 조회
    @Get('/') // '/' 는 루트라면 생략 가능
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // 게시물 생성
    @Post()
    createBoard(
        @Body('title') title: string, 
        @Body('description') description: string): Board {
        // 클라이언트가 보낸 파라미터를 가져오자.
        // nestjs에서는 @Body() body 로 가져올 수 있다.
        // express 에서의 req 와 비슷하다.
        // @Body('title') title -> 클라이언트가 입력한 title 을 가져온다.
        return this.boardsService.createBoard(title, description);
    }

}


// 컨트롤러는 @데코레이터로 컨트롤러라고 지정하고
// 컨트롤러 클래스 내부에 있는 하나하나의 메소드는 핸들러라고 함

// 컨트롤러 생성은 cli로 진행
// nest g controller 컨트롤러명 [옵션]
// nest g controller boards --no-spec
// --no-spec 옵션을 주면 해당 컨트롤러의 테스트 클래스를 만들지 않음

// Provider??
// 종석성을 주입시켜주는 친구
// 만약 컨트롤러가a 가 service b가 필요하면, 주입시켜줌
// 컨트롤러a 클래스에 contructor 로 작성하면 주입된다

// 프로바이더를 사용하려면 nest 에 등록해줘야 함
// module 파일의 provider 항목에 추가해줘야함

// 서비스는 db 데이터를 다루는 등의 핵심 비즈니스 로직에 해당한다.
// cli 로 생성한다.
// nest g service boards --no-spec

