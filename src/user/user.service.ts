import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { successResponse } from 'src/common/http/response.util';
import { ChangePasswordDto } from 'src/dto/change-password.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repo';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private readonly claudhinaryService: CloudinaryService,
    private readonly userRepo: UserRepository,
  ) {}
  async getProfile(user: User) {
    return successResponse('user profile fetched successfully', { user });
  }
  async uploadProfileImage(userId: number, file: Express.Multer.File) {
    const result = await this.claudhinaryService.uploadImage(file);
    await this.userRepo.uplaodProfileImage(userId, result.secure_url);
    return successResponse('Profile image uploaded successfully', {
      imageUrl: result.secure_url,
    });
  }

  async changeUserName(userId: number, dto: UpdateProfileDto) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.updateUserName(userId, dto.name);

    return successResponse('Username updated successfully', null);
  }

  async changePassword(dto: ChangePasswordDto, user: User) {
    const matchPassword = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );

    if (!matchPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.userRepo.updatePassword(user.id, hashedPassword);

    return successResponse('Password changed successfully', null);
  }
}
