import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(id: number): string {
    return this.jwtService.sign(
      { sub: id },
      {
        expiresIn: '1d',
      },
    );
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
