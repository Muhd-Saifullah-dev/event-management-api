import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './email/email.processor/email.processor';
import { MailModule } from 'src/mail/mail.module';
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
  exports: [BullModule],
  providers: [EmailProcessor],
})
export class QueueModule {}
