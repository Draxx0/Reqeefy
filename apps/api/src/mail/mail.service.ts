import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ForgotPasswordMail } from './types/forgot-password';
import { WelcomeMail } from './types/welcome';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation({ user, token }: WelcomeMail) {
    const url = `localhost:3000/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject:
        'Bienvenue sur Reqeefy ! Veuillez confirmer votre adresse email.',
      template: 'welcome',
      context: {
        first_name: user.first_name,
        last_name: user.last_name,
        url,
      },
    });
  }

  async sendForgotPassword({ user, token }: ForgotPasswordMail) {
    const url = `http://localhost:3000/auth/reset-password/${user.id}/${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        template: 'forgot-password',
        context: {
          reset_password_url: url,
        },
      });

      return true;
    } catch (error) {
      throw new Error('An error occured while sending email');
    }
  }
}
