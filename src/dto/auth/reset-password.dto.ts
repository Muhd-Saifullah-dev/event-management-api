import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'token1231',
    description: 'token ',
  })
  @IsString()
  token: string;
  @ApiProperty({
    example: '12345678',
    description: ' new password ',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
