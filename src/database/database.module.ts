import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    DatabaseService,
    {
      provide: DataSource,
      useFactory: () => {
        return new DataSource({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [],
          synchronize: false,
        });
      },
    },
  ],
  exports:[DataSource]
})
export class DatabaseModule {}
