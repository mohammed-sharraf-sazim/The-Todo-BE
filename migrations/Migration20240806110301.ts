import { Migration } from '@mikro-orm/migrations';

export class Migration20240806110301 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "todo" drop constraint if exists "todo_priority_check";',
    );

    // Update invalid priorities before applying the new constraint
    this.addSql(
      `UPDATE "todo" SET "priority" = 'No priority' WHERE "priority" NOT IN ('High', 'Medium', 'Low', 'No priority');`,
    );

    // Add the new constraint
    this.addSql(
      "alter table \"todo\" add constraint \"todo_priority_check\" check (\"priority\" in ('High', 'Medium', 'Low', 'No priority'));",
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "todo" drop constraint if exists "todo_priority_check";',
    );

    this.addSql(
      "alter table \"todo\" add constraint \"todo_priority_check\" check (\"priority\" in ('high', 'medium', 'low', 'no_priority'));",
    );
  }
}
