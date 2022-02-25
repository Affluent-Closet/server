import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// //aws 설정 다 해준 상태

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'goods',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};
