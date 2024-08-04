import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todos.repository';
import { EntityManager } from '@mikro-orm/core';
import { Todo } from '../common/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todos.dtos';

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepository: TodoRepository,
    private readonly em: EntityManager,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(createTodoDto);
    await this.em.flush();
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.findAll();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.update(id, updateTodoDto);
    await this.em.flush();
    return todo;
  }

  async removeTodo(id: string): Promise<void> {
    this.todosRepository.remove(id);
    await this.em.flush();
  }
}
