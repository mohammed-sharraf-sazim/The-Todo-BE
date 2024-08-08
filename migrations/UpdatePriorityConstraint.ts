import { Migration } from '@mikro-orm/migrations';

export class UpdatePriorityConstraint extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create table "todo" (
        "id" varchar(255) not null, 
        "created_at" timestamptz not null, 
        "updated_at" timestamptz null, 
        "description" varchar(255) not null, 
        "is_completed" boolean not null default false, 
        "priority" text check ("priority" in ('High', 'Medium', 'Low', 'No priority')) not null default 'No priority', 
        "due_date" timestamptz not null, 
        constraint "todo_pkey" primary key ("id")
      );
    `);
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "todo" cascade;');
  }
}
