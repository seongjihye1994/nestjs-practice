import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) // 중복되는 username 데이터는 들어갈 수 없게 처리
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 회원과 게시판의 연관관계 설정!
  // 회원은 여러개의 게시물 등록 가능 => OneToMany
  // type => Board : 가지고 올 타입은 Board 타입
  // board => board.user : board에서 user를 접근하려면 board.user로
  // {eager: true} : 패치 전략은 eager (user를 가져올 때 board도 가져옴)
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
