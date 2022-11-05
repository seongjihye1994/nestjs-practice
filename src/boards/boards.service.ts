import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // 여러개의 uuid 버전 중 v1 을 사용
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {

    // 모든 게시물을 가져오는 핸들러 생성하기
    private boards: Board[] = [];
    // : Board[] -> Board 배열 타입

    getAllBoards(): Board[] { // : Board[] -> return type
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        // 컨트롤러에서 dto 로 받은 데이터를 각각 초기화해줌
        const { title, description } = createBoardDto;

        const board: Board = {
            id: uuid(), // id 는 uuid 를 적용
            title,
            description,
            status: BoardStatus.PUBLIC // 처음 디폴트는 PUBLIC
        }

        this.boards.push(board); // 메모리에 생성한 게시물 push
        return board; // 생셩한 게시물 리턴
    }

    getBoardById(id: string): Board {
        return this.boards.find(board => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards.filter(board => board.id !== id);
        // boards 배열에서 특정 id 와 같지 않은 것은 남기고
        // 같은 것만 찾아서 지워줌
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

}

// 서비스는 Injectable 데코레이터가 있음
// 컨트롤러를 제외한 서비스나 리포지토리는 Module 파일의 Providers 에 기재됨
// 서비스는 db 데이터를 다루는 등의 비즈니스 로직을 처리함

// 역시나, 이 서비스를 컨트롤러에서 사용하려면
// 컨트롤러의 컨트스럭터 내부에 이 서비스를 생성해줘야함 -> DI

// 타입을 정의해주면 좋은 이유?
// 원하는 타입과 다른 코드를 사용 할 시 컴파일 에러를 알려주기 때문에 에러를 방지한다.
// 혼자 개발하는것이 아닌, 여러 동료들과 개발하기 때문에 코드의 가독성이 높아진다.