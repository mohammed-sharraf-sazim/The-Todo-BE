import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Todo } from '../common/entities/todo.entity';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

const config: MikroOrmModuleOptions = {
  entities: [Todo],
  dbName: 'task_db',
  driver: PostgreSqlDriver,
  user: 'postgres',
  password: 'Sharraf',
  host: 'localhost',
  port: 5432,
  debug: true,
  migrations: {
    path: './migrations',
    generator: TSMigrationGenerator,
  },
};

export default config;
