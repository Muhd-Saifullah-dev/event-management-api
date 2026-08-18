import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserRepository } from 'src/repositories/user.repo';
import { DatabaseModule } from 'src/database/database.module';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule, AuthModule],

  controllers: [UserController],

  providers: [UserService],
})
export class UserModule {}
