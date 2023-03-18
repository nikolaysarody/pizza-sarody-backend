import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Token, TokenDocument} from './schemas/token.schema';
import {AuthUserResponse} from '../auth/response';
// import {hash} from 'bcryptjs';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    async generateAccessToken(id: string) {
        const payload = {id};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('EXPIRE_ACCESS')
        });
    }

    async generateRefreshToken(id: string) {
        const payload = {id};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('EXPIRE_REFRESH')
        });
    }

    async saveRefreshToken(id: string, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({user: id});
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }
        const token = new this.tokenModel({
            user: id,
            refresh_token: refreshToken
        });
        return await token.save();
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

    async removeToken(refreshToken) {
        const tokenData = await this.tokenModel.deleteOne({refreshToken});
        return tokenData;
    }
}