import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './email/email.processor';
import { MailModule } from 'src/mail/mail.module';
import { EmailQueueService } from './email/email-queue.service';
@Module({
  imports: [
    MailModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  exports: [EmailQueueService],
  providers: [EmailProcessor, EmailQueueService],
})
export class QueueModule {}
