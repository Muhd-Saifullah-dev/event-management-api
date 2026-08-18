import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { successResponse } from 'src/common/http/response.util';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repo';

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

  async changeUserName(userId:number,dto:UpdateProfileDto){
     const user = await this.userRepo.findById(userId);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  await this.userRepo.updateUserName(
    userId,
    dto.name,
  );

  return successResponse(
    'Username updated successfully',
    null,
  );
  }







}
