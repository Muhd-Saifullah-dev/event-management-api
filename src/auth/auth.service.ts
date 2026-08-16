import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register.dto';
import { UserRepository } from 'src/repositories/user.repo';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}
  async registerUser(dto: RegisterUserDto) {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('email is already exist');
    }
  }
}
