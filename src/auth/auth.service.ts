import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Assume you have a UsersService for user management
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async generateMagicLink(email: string) {
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            user = await this.usersService.createUser(email);
        }

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload, { expiresIn: '15m' }); // Magic link valid for 15 minutes

        await this.mailService.sendMagicLink(email, token);
        return { message: 'Magic link sent' };
    }

    async verifyMagicLink(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                throw new Error('Invalid token');
            }
            return user;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}