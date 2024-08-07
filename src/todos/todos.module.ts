import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodoRepository } from './todos.repository';
import { Todo } from '../common/entities/todo.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  providers: [TodosService, TodoRepository],
  controllers: [TodosController],
})
export class TodosModule {}
