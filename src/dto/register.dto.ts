import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/user.role.enum';
export class RegisterUserDto {
  @ApiProperty({
    example: 'Saifullah',
    description: 'User full name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'saif@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'Password123!',
    description: 'User password',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
