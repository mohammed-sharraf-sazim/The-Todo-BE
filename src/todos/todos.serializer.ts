import { AbstractBaseSerializer } from '../common/serializers/abstract-base.serializer';
import { Todo } from '../common/entities/todo.entity';

export class TodoSerializer extends AbstractBaseSerializer<Todo> {
  constructor(todo: Todo) {
    super(todo);
  }

  protected toObject(todo: Todo): any {
    return {
      id: todo.id,
      description: todo.description,
      isCompleted: todo.isCompleted,
      priority: todo.priority,
      dueDate: todo.dueDate,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }
}
