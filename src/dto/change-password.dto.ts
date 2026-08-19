import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'currentpassword',
    description: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @ApiProperty({
    example: 'new password',
    description: '13023e34',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
