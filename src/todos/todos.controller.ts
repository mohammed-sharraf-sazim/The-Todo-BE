import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './todos.dtos';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.removeTodo(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(id, updateTodoDto);
  }

  @Patch(':id/toggle')
  markTaskAsCompleted(@Param('id') id: string) {
    return this.todosService.markTaskAsCompleted(id);
  }

  @Delete('clear/completed')
  clearCompletedTasks() {
    return this.todosService.clearCompletedTasks();
  }
}
