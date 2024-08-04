import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import config from './db/mikro-orm.config';
@Module({
  imports: [MikroOrmModule.forRoot({ ...config })],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    const isConnected = await this.orm.isConnected();
    if (isConnected) {
      this.logger.log('Successfully connected to the database');
    } else {
      this.logger.error('Failed to connect to the database');
    }
  }
}
