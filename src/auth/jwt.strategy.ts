import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "2f26c4bed77d8cf30ff732f9387b4da92ca01b1a2c90c768354513ed0235c499",
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}