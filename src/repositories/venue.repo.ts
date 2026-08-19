import { Injectable } from '@nestjs/common';
import { pagination } from 'src/common/helper/pagination.helper';
import { CreateVenueDto } from 'src/dto/venues/create-venue.dto';
import { Venue } from 'src/entities/venue.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VenueRepository {
  private readonly repository: Repository<Venue>;
  constructor(private readonly datasource: DataSource) {
    this.repository = this.datasource.getRepository(Venue);
  }

  async getAllVenues(page: number, limit: number, userId: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      where: {
        organizer: {
          id: userId,
        },
      },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return pagination(data, total, page, limit);
  }

  async getSingleVenue() {}

  async createVenue(
    dto: CreateVenueDto,
    userId: number,
    imageUrl: string | undefined,
  ): Promise<Venue> {
    const venue = this.repository.create({
      ...dto,
      imageUrl,
      organizer: {
        id: userId,
      },
    });
    return await this.repository.save(venue);
  }
}
