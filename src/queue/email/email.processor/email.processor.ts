import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  onModuleInit() {
    this.logger.log('Email BullMQ worker started');
  }

  async process(job: Job): Promise<any> {
    console.log('Processing job:', job.name);
    console.log('Job data:', job.data);
    switch (job.name) {
      case 'send-otp':
        await this.sendOtpEmail(job.data);
        break;

      case 'forgot-password':
        await this.sendForgotPasswordEmail(job.data);
        break;

      default:
        console.log(`Unknown job: ${job.name}`);
    }
  }

  private async sendOtpEmail(data: { email: string; otp: string }) {
    this.logger.log(`Sending OTP ${data.otp} to ${data.email}`);

    // yahan actual email sending hogi
  }

  private async sendForgotPasswordEmail(data: {
    email: string;
    resetToken: string;
  }) {
    this.logger.log(`Sending reset email to ${data.email}`);

    // yahan actual email sending hogi
  }
}
