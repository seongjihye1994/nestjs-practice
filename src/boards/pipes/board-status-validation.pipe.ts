import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

// 게시글의 상태를 업데이트 할 때 사용하는 커스텀 벨리데이터 파이프
export class BoardStatusValidationPipe implements PipeTransform {
  // value는 실제로 사용자가 입력한 값
  // metadata는 해당 값의 타입 및 http 요청 메소드, key 등등을 의미함

  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value); // value dkanrjsk
    console.log('metadata', metadata); // metadata { metatype: [Function: String], type: 'body', data: 'status' }

    // 이 데이터를 받아 validation을 처리함
    value = value.toUpperCase(); // 1. 클라이언트에서 받은 데이터 대문자로 변환

    // 2. 밸리데이션
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  // indexOf(값) : 해당 값이 할당된 index를 리턴
  // 즉, list = ["값1", "값2", "값3"] 에서 list.index("값1") 하면 index 0을 리턴
  // 만약 해당 데이터가 list에 없다면? -> -1을 리턴
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1; // -1 이 아니라면, 즉 데이터가 있다면 리턴해라.
  }
}
