import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { UserRepository } from 'src/repositories/user.repo';
import { JwtTokenService } from 'src/services/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is required');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }
    const payload = this.jwtTokenService.verifyToken(token);
    this.logger.debug(`payload is in authGuard :: ${payload}`);
    const user = await this.userRepo.findById(payload.sub);
    console.log('lallaalal', user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    request.user = user;
    return true;
  }
}
