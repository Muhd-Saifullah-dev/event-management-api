import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

import { UserModule } from 'src/user/user.module';

import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [UserModule, AuthModule, CloudinaryModule],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
