import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Todo } from '../common/entities/todo.entity';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: MikroOrmModuleOptions = {
  entities: [Todo],
  dbName: process.env.DB_NAME,
  driver: PostgreSqlDriver,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  debug: true,
  migrations: {
    path: './migrations',
    generator: TSMigrationGenerator,
  },
};

export default config;
