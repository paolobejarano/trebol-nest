import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendMagicLink(email: string, token: string) {
        const url = `${process.env.APP_URL}/auth/magic-link?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Login to Your Account',
            text: `Click the following link to login: ${url}`,
        };

        return this.transporter.sendMail(mailOptions);
    }
}