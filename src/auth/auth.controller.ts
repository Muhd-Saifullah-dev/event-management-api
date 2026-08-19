import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/auth/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from 'src/dto/auth/verify-otp.dto';
import { ResendOtpDto } from 'src/dto/auth/resend-otp.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { ForgotPasswordDto } from 'src/dto/auth/froget-password.dto';
import { ResetPasswordDto } from 'src/dto/auth/reset-password.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({
    summary: 'create a new  user',
  })
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('verify-otp')
  @ApiOperation({
    summary: 'email verified otp',
  })
  @HttpCode(HttpStatus.OK)
  async verifiedOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('resend-otp')
  @ApiOperation({
    summary: 'resend otp',
  })
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'login user',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Throttle({
    default: {
      limit: 2,
      ttl: 20 * 60 * 1000,
    },
  })
  @Post('forget-password')
  @ApiOperation({ summary: 'user forget password' })
  @HttpCode(HttpStatus.OK)
  async forgetPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'user reset password' })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
