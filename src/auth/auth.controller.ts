import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from 'src/dto/verify-otp.dto';
import { ResendOtpDto } from 'src/dto/resend-otp.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ForgotPasswordDto } from 'src/dto/froget-password.dto';

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

  @Post('forget-password')
  @ApiOperation({summary:"user forget password"})
  @HttpCode(HttpStatus.OK)
  async forgetPassword(@Body() dto:ForgotPasswordDto){
    return this.authService.forgetPassword(dto)
  }
}
