import { Migration } from '@mikro-orm/migrations';

export class Migration20240804141357 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "todo" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "description" varchar(255) not null, "is_completed" boolean not null default false, "priority" text check ("priority" in (\'high\', \'medium\', \'low\', \'no_priority\')) not null default \'no_priority\', "due_date" date not null, constraint "todo_pkey" primary key ("id"));');
  }

}
