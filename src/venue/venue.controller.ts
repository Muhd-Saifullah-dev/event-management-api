import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RoleGuard } from 'src/common/guards/auth/role.guard';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size-validation/file-size-validation.pipe';
import { CreateVenueDto } from 'src/dto/venues/create-venue.dto';
import { VenueService } from './venue.service';

@Controller('venue')
@UseGuards(AuthGuard, RoleGuard)
@Roles('admin', 'organizer')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get('get-all')
  async getAllVenues() {}
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage }))
  async createVenue(
    @Body() dto: CreateVenueDto,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File | undefined,
    @Req() request: Request,
  ) {
    const userId = request.user?.id;
    return;
  }
}
