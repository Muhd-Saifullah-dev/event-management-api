import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register.dto';
import { UserRepository } from 'src/repositories/user.repo';
import { JwtTokenService } from 'src/services/jwt-token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async registerUser(dto: RegisterUserDto) {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('email is already exist');
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepo.createUser({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
      role: dto.role,
    });
  }
}
