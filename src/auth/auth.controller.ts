import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() dto:RegisterUserDto){
    return this.authService.registerUser(dto)
  }
}
