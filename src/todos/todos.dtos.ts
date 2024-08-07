import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { TaskPriority } from '../common/entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  description: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
