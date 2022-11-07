import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12341234',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 이 엔티티 파일로 DB 테이블 생성해줌. 그 경로를 적어줌
  synchronize: true,
};
