import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'saifullah@gmail.com',
    description: 'email',
  })
  @IsEmail()
  email: string;
}
