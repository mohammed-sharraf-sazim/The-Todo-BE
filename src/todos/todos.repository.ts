import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Todo } from '../common/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todos.dtos';

@Injectable()
export class TodoRepository {
  constructor(private readonly em: EntityManager) {}

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = this.em.create(Todo, createTodoDto);
    this.em.persist(todo);
    return todo;
  }

  findAll(): Promise<Todo[]> {
    return this.em.find(Todo, {});
  }

  findOne(id: string): Promise<Todo> {
    return this.em.findOne(Todo, { id });
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.em.getReference(Todo, id);
    this.em.assign(todo, updateTodoDto);
    this.em.persist(todo);
    return todo;
  }

  remove(id: string): void {
    const todo = this.em.getReference(Todo, id);
    this.em.remove(todo);
  }
}
