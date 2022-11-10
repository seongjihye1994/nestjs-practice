import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private log = new Logger('BoardsController');

  // boardController 는 boardsService를 DI
  constructor(private boardsService: BoardsService) {}
  // 이 때 private 을 붙이지 않으면 에러남 -> boardsService 를 멤버 변수로 빼줘야 에러 해결
  // 근대 타입 스크립트는 private 을 기재해주면 에러 안남

  // boardsService 를 DI 해줬기 때문에
  // boardsService 에 있는 핸들러를 사용할 수 있음

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // 게시글 생성 시 user 정보도 넣어주기 (어떤 user가 어떤 게시글을 생성하는지에 대해)
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User, // 커스텀 데코레이터 @GetUser 사용해서 user 정보 insert
  ): Promise<Board> {
    this.log.verbose(
      `User ${user.username} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // remove vs delete
  // remove 는 지울 대상이 DB에 없다면 에러, delete는 있으면 지우고 없으면 영향 x
  @Delete('/:id')
  deleteById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.log.verbose(`User ${user.username} trying to get all boards.`);
    return this.boardsService.getAllBoards(user);
  }

  // // 게시물 모두 조회
  // @Get('/') // '/' 는 루트라면 생략 가능
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // // 게시물 생성
  // @Post()
  // @UsePipes(ValidationPipe) // DTO 에 적용한 pipe validator 를 사용하기 위해 적어줌
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   // 클라이언트가 보낸 파라미터를 가져오자.
  //   // nestjs에서는 @Body() body 로 가져올 수 있다.
  //   // express 에서의 req 와 비슷하다.
  //   // @Body('title') title -> 클라이언트가 입력한 title 을 가져온다.

  //   // 하지만 클라이언트가 요청할 때 보내는 파라미터 필드가 많아지면
  //   // 이렇게 하나씩 처리하기 힘들어지니 dto 를 생성해서 dto 로 한번에 받을 수 있다.
  //   // -> CreateBoardDto 로 request 파라미터 한번에 받기!
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // // 게시물 id 로 게시물 하나 조회
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   // http body 가 아닌, header 에 있는 파라미터 값은 @Param() 으로 가져온다.
  //   return this.boardsService.getBoardById(id);

  //   // 파라미터가 복수개일 때는 @Param() 만 작성하면 되고
  //   // 여러개의 파라미터 중 지정해서 가져오고 싶으면
  //   // @Param('가져올 키')로 가져온다.
  // }

  // // 게시물 id 로 게시물 하나 삭제
  // @Delete(':/id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // // 게시물 id 로 게시물 하나 업데이트
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus, // status 는 쿼리파라미터로 받아오지 않음
  //   // BoardStatusValidationPipe : 커스텀 validator 파이프
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}

// 컨트롤러는 @데코레이터로 컨트롤러라고 지정하고
// 컨트롤러 클래스 내부에 있는 하나하나의 메소드는 핸들러라고 함

// 컨트롤러 생성은 cli로 진행
// nest g controller 컨트롤러명 [옵션]
// nest g controller boards --no-spec
// --no-spec 옵션을 주면 해당 컨트롤러의 테스트 클래스를 만들지 않음

// Provider??
// 종석성을 주입시켜주는 친구
// 만약 컨트롤러가a 가 service b가 필요하면, 주입시켜줌
// 컨트롤러a 클래스에 contructor 로 작성하면 주입된다

// 프로바이더를 사용하려면 nest 에 등록해줘야 함
// module 파일의 provider 항목에 추가해줘야함

// 서비스는 db 데이터를 다루는 등의 핵심 비즈니스 로직에 해당한다.
// cli 로 생성한다.
// nest g service boards --no-spec
