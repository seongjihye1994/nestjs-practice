import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// @UseGuards(AuthGuard()) 사용 시 req로 user를 받을 수 있는데
// 이 req를 User 객체로 변환해서 User 객체로 받고싶을 때
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
