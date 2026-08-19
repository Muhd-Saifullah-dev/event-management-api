import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.getOrThrow<string>(
      'CLOUDINARY_CLOUD_NAME',
    );

    const apiKey = this.configService.getOrThrow<string>('CLOUDINARY_API_KEY');

    const apiSecret = this.configService.getOrThrow<string>(
      'CLOUDINARY_API_SECRET',
    );

    console.log({
      cloudName,
      apiKey,
      apiSecretExists: !!apiSecret,
    });

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'event-management',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary error:', error);
            console.error('Cloudinary error message:', error.message);
            console.error(
              'Cloudinary error details:',
              JSON.stringify(error, null, 2),
            );
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error('Cloudinary returned no result'));
            return;
          }

          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
