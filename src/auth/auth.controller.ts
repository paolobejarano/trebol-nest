import { Controller, Post, Body, Query, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('magic-link')
    async sendMagicLink(@Body('email') email: string) {
        return this.authService.generateMagicLink(email);
    }

    @Get('magic-link')
    async verifyMagicLink(@Query('token') token: string, @Res() res: Response) {
        try {
            const user = await this.authService.verifyMagicLink(token);
            const jwtToken = await this.authService.login(user);
            res.cookie('jwt', jwtToken.access_token, { httpOnly: true });
            return res.redirect('/'); // Redirect to your desired route after login
        } catch (error) {
            return res.status(400).send('Invalid or expired magic link');
        }
    }
}