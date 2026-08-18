import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { UserService } from './user.service';
import type { Request } from 'express';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size-validation/file-size-validation.pipe';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'get profile ',
  })
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() request: Request) {
    return this.userService.getProfile(request.user!);
  }

  @ApiOperation({
    summary: 'Upload profile image',
  })
  @Post('profile-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  @HttpCode(HttpStatus.OK)
  async uploadProfileImage(
    @UploadedFile(new FileSizeValidationPipe())
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    return this.userService.uploadProfileImage(request.user!.id, file);
  }

  @Patch('profile')
   @ApiOperation({
    summary: 'change user name only',
  })
  @HttpCode(HttpStatus.OK)
  async changeUsername(@Body() dto:UpdateProfileDto,@Req() request:Request){
    return this.userService.changeUserName(request.user!.id,
    dto)
  }
  
}
