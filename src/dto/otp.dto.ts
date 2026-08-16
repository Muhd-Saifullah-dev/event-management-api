import { IsNumber, MaxLength, MinLength } from 'class-validator';

export class OtpDto {
  @IsNumber()
  @MinLength(6)
  @MaxLength(6)
  otp: number;
}
