import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from 'src/services/jwt-token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  exports: [JwtTokenService],
})
export class AuthModule {}
