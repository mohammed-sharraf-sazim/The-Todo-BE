import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TodoRepository } from './todos.repository';
import { EntityManager } from '@mikro-orm/core';
import { Todo } from '../common/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todos.dtos';
import { TodoSerializer } from './todos.serializer';

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepository: TodoRepository,
    private readonly em: EntityManager,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todosRepository.create(createTodoDto);
      await this.em.flush();
      return new TodoSerializer(todo).serialize() as unknown as Todo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new InternalServerErrorException('Failed to create a new task.');
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      const todos = await this.todosRepository.findAll();
      return todos.map(
        (todo) => new TodoSerializer(todo).serialize() as unknown as Todo,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch todos');
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.todosRepository.findOne(id);
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      return new TodoSerializer(todo).serialize() as unknown as Todo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to fetch todo');
      }
    }
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = this.todosRepository.update(id, updateTodoDto);
      await this.em.flush();
      return new TodoSerializer(todo).serialize() as unknown as Todo;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update todo');
    }
  }

  async removeTodo(id: string): Promise<void> {
    const todo = await this.todosRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    try {
      this.todosRepository.remove(id);
      await this.em.flush();
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove todo');
    }
  }

  async markTaskAsCompleted(id: string): Promise<Todo> {
    try {
      const todo = await this.todosRepository.markTaskAsCompleted(id);
      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      await this.em.flush();
      return new TodoSerializer(todo).serialize() as unknown as Todo;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to mark task as completed',
      );
    }
  }

  async clearCompletedTasks(): Promise<void> {
    try {
      await this.todosRepository.clearCompletedTasks();
      await this.em.flush();
    } catch (error) {
      throw new InternalServerErrorException('Failed to clear completed tasks');
    }
  }
}
