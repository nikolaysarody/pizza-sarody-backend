import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '../user/schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {TokenService} from '../token/token.service';
import {AuthUserResponse} from './response';
import {UserService} from '../user/user.service';
import {AppError} from '../../exceptions/api.errors';

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
            throw new HttpException(AppError.WRONG_PASSWORD_OR_LOGIN, HttpStatus.BAD_REQUEST);
        }
        const validatePassword = await this.userService.validateUser(email, password);
        if (!validatePassword) {
            throw new HttpException(AppError.WRONG_PASSWORD_OR_LOGIN, HttpStatus.BAD_REQUEST);
        }
        const accessToken = await this.tokenService.generateAccessToken(user._id);
        const refreshToken = await this.tokenService.generateRefreshToken(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            username: user.username,
            id: user._id
        }
    }

    async logout(refreshToken: string) {
        return await this.tokenService.removeToken(refreshToken);
    }

    async refresh(token: string): Promise<AuthUserResponse> {
        if (!token) {
            throw new HttpException(AppError.TOKEN_OVERDUE, HttpStatus.BAD_REQUEST);
        }
        const userData = await this.tokenService.validateRefreshToken(token);
        const tokenFromDb = await this.tokenService.findToken(token);
        if (!userData || !tokenFromDb) {
            throw new HttpException(AppError.TOKEN_OVERDUE, HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(userData.id);
        const accessToken = await this.tokenService.generateAccessToken(user._id);
        const refreshToken = await this.tokenService.generateRefreshToken(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            username: user.username,
            id: user._id
        }
    }
}
