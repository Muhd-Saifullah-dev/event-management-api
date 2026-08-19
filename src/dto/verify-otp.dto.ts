import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VerifyOtpDto {
  @ApiProperty({
    example: 'saifullah@gmail.com',
    description: 'email',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '4994',
    description: 'email verified otp',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  otp: string;
}
