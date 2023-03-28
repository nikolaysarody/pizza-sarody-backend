import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '../user/schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {TokenService} from '../token/token.service';
import {AppError} from '../../common/errors';
import {AuthUserResponse} from './response';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {
    }

    async login({email, password}: AuthDto): Promise<AuthUserResponse> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const validatePassword = await this.userService.validateUser(email, password);
        if (!validatePassword) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const accessToken = await this.tokenService.generateAccessToken(user.id);
        const refreshToken = await this.tokenService.generateRefreshToken(user.id);
        await this.tokenService.saveRefreshToken(user.id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            id: user.id
        }
    }

    async logout(refreshToken: string) {
        return await this.tokenService.removeToken(refreshToken);
    }

    async refresh(token: string, email: string): Promise<AuthUserResponse> {
        if (!token) {
            throw new UnauthorizedException();
        }
        const userData = await this.tokenService.validateRefreshToken(token);
        const tokenFromDb = await this.tokenService.findToken(token);
        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findUserByEmail(email);
        const accessToken = await this.tokenService.generateAccessToken(user.id);
        const refreshToken = await this.tokenService.generateRefreshToken(user.id);
        await this.tokenService.saveRefreshToken(user.id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            id: user.id
        }
    }
}
