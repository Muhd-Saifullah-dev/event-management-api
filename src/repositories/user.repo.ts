import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.repository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role:data.role
    });
    return this.repository.save(user);
  }

  async uplaodProfileImage(id: number, url: string) {
    return this.repository.update({ id }, { imageUrl: url });
  }

  async updateIsVerified(id: number) {
    return this.repository.update({ id }, { isVerified: true });
  }
}
