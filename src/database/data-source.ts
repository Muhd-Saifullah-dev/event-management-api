import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Venue } from '../entities/venue.entity';

const AppDataSource = new DataSource({
  type: 'mysql',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  entities: [User, Venue],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});

export default AppDataSource;
