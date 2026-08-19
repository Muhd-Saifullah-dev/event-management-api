import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ResendOtpDto {
  @ApiProperty({
    example: 'saifullah@gmail.com',
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
