import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Token, TokenDocument} from './schemas/token.schema';
import {TokenResponse} from './response';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    async generateAccessToken(_id: string): Promise<string> {
        const payload = {_id};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('EXPIRE_ACCESS')
        });
    }

    async generateRefreshToken(_id: string): Promise<string> {
        const payload = {_id};
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('EXPIRE_REFRESH')
        });
    }

    async saveRefreshToken(id: string, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({user: id}).exec();
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

    async validateRefreshToken(token: string): Promise<TokenResponse> {
        try {
            return await this.jwtService.verifyAsync(token, {secret: this.configService.get('JWT_REFRESH_SECRET')});
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        return await this.tokenModel.deleteOne({refresh_token: refreshToken}).exec();
    }

    async findToken(refreshToken) {
        return await this.tokenModel.findOne({refresh_token: refreshToken}).exec();
    }
}