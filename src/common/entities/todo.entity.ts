import { Entity, Property, Enum } from '@mikro-orm/core';
import { CustomBaseEntity } from './custom-base.entity';

export enum TaskPriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  NO = 'No priority',
}

@Entity()
export class Todo extends CustomBaseEntity {
  @Property()
  description!: string;

  @Property({ default: false })
  isCompleted: boolean = false;

  @Enum(() => TaskPriority)
  priority: TaskPriority = TaskPriority.NO;

  @Property({ type: 'date' })
  dueDate?: Date;
}
