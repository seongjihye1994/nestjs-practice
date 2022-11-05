import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {

    // 모든 게시물을 가져오는 핸들러 생성하기
    private boards: Board[] = [];
    // : Board[] -> Board 배열 타입

    getAllBoards(): Board[] { // : Board[] -> return type
        return this.boards;
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