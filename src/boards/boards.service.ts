import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; // 여러개의 uuid 버전 중 v1 을 사용
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  // boardService가 boardRepository 를 사용하기 위해 DI
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // TypeORM 이 제공하는 findOne 메소드로 게시물 하나 조회하기
  // async, await 을 사용해서 db 결과값을 모두 받은 후에 다른 로직 처리하도록 하자.
  // 만약 async와 await을 사용하지 않으면 db 조회가 모두 끝나지 않은 상태에서 다른 로직이 처리될 수 있다(비동기)
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // // 모든 게시물을 가져오는 핸들러 생성하기
  // private boards: Board[] = [];
  // // : Board[] -> Board 배열 타입
  // getAllBoards(): Board[] {
  //   // : Board[] -> return type
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   // 컨트롤러에서 dto 로 받은 데이터를 각각 초기화해줌
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(), // id 는 uuid 를 적용
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC, // 처음 디폴트는 PUBLIC
  //   };
  //   this.boards.push(board); // 메모리에 생성한 게시물 push
  //   return board; // 생셩한 게시물 리턴
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`${id} 에 해당하는 게시글이 없습니다.`);
  //   }
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards.filter((board) => board.id !== found.id);
  //   // boards 배열에서 조호해온 board의 id 와 같지 않은 것은 남기고
  //   // 같은 것만 찾아서 지워줌
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}

// 서비스는 Injectable 데코레이터가 있음
// 컨트롤러를 제외한 서비스는 Module 파일의 Providers 에 기재됨
// 서비스는 db 데이터를 다루는 등의 비즈니스 로직을 처리함

// 역시나, 이 서비스를 컨트롤러에서 사용하려면
// 컨트롤러의 컨트스럭터 내부에 이 서비스를 생성해줘야함 -> DI

// 타입을 정의해주면 좋은 이유?
// 원하는 타입과 다른 코드를 사용 할 시 컴파일 에러를 알려주기 때문에 에러를 방지한다.
// 혼자 개발하는것이 아닌, 여러 동료들과 개발하기 때문에 코드의 가독성이 높아진다.

// pipe 란?
// 클라이언트에서 넘겨주는 요청 파라미터 데이터의 형식을 변환하거나
// 데이터의 유효성을 검사해주는 모듈

// npm install class-validator class-transformer --save 로 설치해주기
