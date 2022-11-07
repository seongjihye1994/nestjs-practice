import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board) // 이 리포지토리는 Board 를 컨트롤한다.
export class BoardRepository extends Repository<Board> {
  // Repository 를 extends 해야 기본 CRUD를 사용할 수 있음
}
