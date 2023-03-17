import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    async generateAccessToken(email: string) {
        const payload = {email};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('EXPIRE_ACCESS')
        });
    }

    async generateRefreshToken(email: string) {
        const payload = {email};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('EXPIRE_REFRESH')
        });
    }

    async validateAccessToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {secret: this.configService.get('JWT_ACCESS_SECRET')});
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {secret: this.configService.get('JWT_REFRESH_SECRET')});
        } catch (e) {
            return null;
        }
    }
}