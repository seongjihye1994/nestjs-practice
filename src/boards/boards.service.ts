import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {}

// 서비스는 Injectable 데코레이터가 있음
// 컨트롤러를 제외한 서비스나 리포지토리는 Module 파일의 Providers 에 기재됨
// 서비스는 db 데이터를 다루는 등의 비즈니스 로직을 처리함

// 역시나, 이 서비스를 컨트롤러에서 사용하려면
// 컨트롤러의 컨트스럭터 내부에 이 서비스를 생성해줘야함 -> DI