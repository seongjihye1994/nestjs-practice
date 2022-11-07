import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board) // 이 리포지토리는 Board 를 컨트롤한다.
export class BoardRepository extends Repository<Board> {
  // Repository 를 extends 해야 기본 CRUD를 사용할 수 있음

  async getBoardById(id: number): Promise<Board> {
    return await this.findOne(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC, // 맨 처음 생성할 때는 PUBLIC 디폴트
    });

    await this.save(board);

    return board;
  }
}
