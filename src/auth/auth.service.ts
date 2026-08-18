import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register.dto';
import { UserRepository } from 'src/repositories/user.repo';
import { JwtTokenService } from 'src/services/jwt-token.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { RedisKey, RedisTTL } from 'src/contants/redis-key';
import { generateOtp } from 'src/common/helper/otp.helper';
import { EmailQueueService } from 'src/queue/email/email-queue.service';
import { successResponse } from 'src/common/http/response.util';
import { VerifyOtpDto } from 'src/dto/verify-otp.dto';
import { ResendOtpDto } from 'src/dto/resend-otp.dto';
import { LoginDto } from 'src/dto/login.dto';
import * as crypto from 'crypto';
import { ForgotPasswordDto } from 'src/dto/froget-password.dto';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';

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

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.isVerified) {
      throw new ConflictException('Email is already verified');
    }
    const redis = this.redisService.getClient();
    const storedOtp = await redis.get(RedisKey.otp(dto.email));
    if (!storedOtp) {
      throw new UnauthorizedException('Otp has expired or does not exist');
    }
    if (storedOtp !== dto.otp) {
      throw new UnauthorizedException('Invalid otp');
    }

    await this.userRepo.updateIsVerified(user.id);
    await redis.del(RedisKey.otp(user.email));

    const accessToken = await this.jwtTokenService.generateToken(user.id);
    return successResponse('user loggin successfulty', { user, accessToken });
  }

  async resendOtp(dto: ResendOtpDto) {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.isVerified) {
      throw new ConflictException('Email is already verified');
    }

    const otp = generateOtp();

    await this.redisService
      .getClient()
      .set(RedisKey.otp(user.email), otp, 'EX', RedisTTL.OTP);

    await this.emailQueueService.sendOtp(user.email, otp, user.name);

    return successResponse('A new OTP has been sent to your email', null);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('user not exist');
    }
    const matchPassword = await bcrypt.compare(dto.password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('Invalid credential');
    }
    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const accessToken = this.jwtTokenService.generateToken(user.id);

    return successResponse('login successfully', { user, accessToken });
  }

  async forgetPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepo.findByEmail(dto.email);

    // User exist kare ya na kare,
    // same response dena better hai.
    if (!user) {
      return successResponse(
        'If the email exists, a password reset link has been sent',
        null,
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    await this.redisService
      .getClient()
      .set(
        RedisKey.passwordReset(user.email),
        resetToken,
        'EX',
        RedisTTL.PASSWORD_RESET,
      );

    await this.emailQueueService.sendForgotPassword(
      user.email,
      resetToken,
      user.name,
    );

    return successResponse(
      'password reset link has been sent',
      null,
    );
  }
  async resetPassword(dto: ResetPasswordDto) {
  const redis = this.redisService.getClient();

  const storedToken = await redis.get(
    RedisKey.passwordReset(dto.email),
  );

  if (!storedToken || storedToken !== dto.token) {
    throw new BadRequestException(
      'Invalid or expired reset link',
    );
  }

  const user = await this.userRepo.findByEmail(dto.email);

  if (!user) {
    throw new BadRequestException(
      'Invalid or expired reset link',
    );
  }

  const hashedPassword = await bcrypt.hash(
    dto.newPassword,
    12,
  );

  await this.userRepo.updatePassword(
    user.id,
    hashedPassword,
  );

  // Token ko invalidate karo
  await redis.del(
    RedisKey.passwordReset(dto.email),
  );

  return successResponse(
    'Password reset successfully',
    null,
  );
}
}
