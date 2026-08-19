import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailService } from 'src/mail/mail.service';
import { sendOtpTemplate } from 'src/mail/templates/otp-template';
import { resetPasswordTemplate } from 'src/mail/templates/reset-password-link.template';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private readonly mailService: MailService) {
    super();
  }
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
        this.logger.log(`Unknown job: ${job.name}`);
    }
  }

  private async sendOtpEmail(data: {
    email: string;
    otp: string;
    name: string;
  }) {
    this.logger.log(`Sending OTP ${data.otp} to ${data.email}`);
    await this.mailService.send_email({
      toEmail: data.email,
      subject: 'Verify Your Email',
      html: sendOtpTemplate(data.otp, data.name),
    });
  }

  private async sendForgotPasswordEmail(data: {
    email: string;
    resetToken: string;
    name: string;
  }) {
    this.logger.log(`Sending reset email to ${data.email}`);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?email=${data.email}&token=${data.resetToken}`;
    await this.mailService.send_email({
      toEmail: data.email,
      subject: 'Reset Your Password',
      html: resetPasswordTemplate(resetUrl, data.name),
    });
  }
}
