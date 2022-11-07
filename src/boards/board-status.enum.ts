// 모델을 정의하기 위해서는 class 또는 interface 를 사용하면 된다.

// 인터페이스는 변수의 타입만 체크하고
// 클래스는 변수 타입 체크와 인스턴스를 생성할 수 있다.

// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus; // 공개 게시글인지 비공개 게시글인지의 여부
// }

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
