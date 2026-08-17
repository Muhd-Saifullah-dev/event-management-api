import { UserRole } from '../enums/user.role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  @Column()
  password: string;
  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: false })
  isVerified: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
