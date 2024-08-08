import { Migration } from '@mikro-orm/migrations';

export class Migration20240807042408 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" alter column "due_date" type timestamptz using ("due_date"::timestamptz);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" alter column "due_date" type date using ("due_date"::date);');
  }

}
