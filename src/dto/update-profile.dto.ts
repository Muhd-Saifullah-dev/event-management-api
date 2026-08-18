import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'saifullah don',
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
