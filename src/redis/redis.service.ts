import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(RedisService.name);
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}
  async onModuleInit() {
    if (this.redis.status !== 'ready') {
      await this.redis.connect();
    }
    this.logger.log('Redis connected successfully');
  }
  async onApplicationShutdown() {
    if (this.redis.status === 'ready') {
      await this.redis.quit;
    }
    this.logger.log('Redis connection closed');
  }
  getClient() {
    return this.redis;
  }
}
