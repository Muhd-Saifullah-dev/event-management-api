import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { successResponse } from 'src/common/http/response.util';
import { CreateVenueDto } from 'src/dto/venues/create-venue.dto';
import { VenueRepository } from 'src/repositories/venue.repo';

@Injectable()
export class VenueService {
  constructor(
    private readonly cloudhinaryService: CloudinaryService,
    private readonly venueRepo: VenueRepository,
  ) {}

  async createVenue(
    dto: CreateVenueDto,
    file: Express.Multer.File | undefined,
    userId: number,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      const result = await this.cloudhinaryService.uploadImage(file);
      imageUrl = result.secure_url;
    }
    const venue = await this.venueRepo.createVenue(dto, userId, imageUrl);
    return successResponse('venue created successfully ', { venue });
  }
}
