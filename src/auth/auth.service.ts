import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register.dto';
import { UserRepository } from 'src/repositories/user.repo';
import { JwtTokenService } from 'src/services/jwt-token.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { RedisKey, RedisTTL } from 'src/contants/redis-key';
import { generateOtp } from 'src/common/helper/otp.helper';
import { EmailQueueService } from 'src/queue/email/email-queue.service';
import { successResponse } from 'src/common/http/response.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly redisService: RedisService,
    private readonly emailQueueService: EmailQueueService,
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
    const otp = generateOtp();
    this.logger.debug(`otp is here : ${otp}`);
    await this.redisService
      .getClient()
      .set(RedisKey.otp(user.email), otp, 'EX', RedisTTL.OTP);

    await this.emailQueueService.sendOtp(user.email, otp, user.name);
    return successResponse('user created successfully', null);
  }

  

}
