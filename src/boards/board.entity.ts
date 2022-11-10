import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

// nestjs 앱 구동 시 자동으로 해당 테이블이 생성됨
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // 게시판과 회원의 연관관계 설정!
  // 게시물 여러개를 각각의 회원이 등록 가능 => ManyToOne
  // type => User : 가지고 올 타입은 User 타입
  // user => user.boards : user에서 boards 를 접근하려면 user.boards 로
  // {eager: false} : 패치 전략은 no eager (boards 를 가져올 때는 user 가져오지 않음)
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
