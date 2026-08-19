import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DataSource } from 'typeorm';

import AppDataSource from './data-source';
import { UserRepository } from 'src/repositories/user.repo';

@Module({
  providers: [
    DatabaseService,
    UserRepository,
    {
      provide: DataSource,
      useValue: AppDataSource,
    },
  ],
  exports: [DataSource, UserRepository],
})
export class DatabaseModule {}
