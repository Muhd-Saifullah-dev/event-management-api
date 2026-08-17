import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  async send_email({ toEmail, subject, html }) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to: toEmail,
        subject,
        html,
      });
      this.logger.log(`✅ Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error('error in send_email', error.message);
      this.transporter.close();
      return;
    }
  }
}
