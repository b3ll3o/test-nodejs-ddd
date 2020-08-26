import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailProvider implements IMailProvider {

  private transporter: Mail;

  constructor(){
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io', 
      port: 2525, 
      auth: {
        user: 'e7ff31810b6253', 
        pass: '8205a97840ca0d'
      }
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name, 
        address: message.to.email
      }, 
      from: {
        name: message.from.name, 
        address: message.from.email
      }, 
      subject: message.subject, 
      html: message.body
    });
  }
}