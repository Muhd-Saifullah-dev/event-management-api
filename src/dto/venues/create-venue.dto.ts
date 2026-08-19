import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({
    example: 'venue  name',
    description: 'venue 1',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'venue address',
    description: 'address properly',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'city name ',
    description: 'karachi ',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'capacity',
    description: '3',
  })
  @IsInt()
  @Min(10)
  capacity: number;

  @ApiProperty({
    example: 'description is optional',
    description: 'description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
