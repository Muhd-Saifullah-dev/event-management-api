import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(private readonly dataSource: DataSource) {}
  async onModuleInit() {
    this.logger.log('Initializing database connection...');

    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }

    this.logger.log('Database connected successfully');
  }

  async onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();

      this.logger.log('Database connection closed');
    }
  }
}
