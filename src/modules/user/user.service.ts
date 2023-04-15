import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {AuthDto} from '../auth/dto/auth.dto';
import {AuthUserResponse} from '../auth/response';
import {compare, genSalt, hash} from 'bcryptjs';
import {TokenService} from '../token/token.service';
import {AppError} from '../../exceptions/api.errors';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly tokenService: TokenService
    ) {
    }

    async createUser({email, password}: AuthDto): Promise<AuthUserResponse> {
        const existUser = await this.findUserByEmail(email);
        if (existUser) {
            throw new HttpException(AppError.ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
        }
        const salt = await genSalt(10);
        const newUser = await new this.userModel({
            email,
            passwordHash: await hash(password, salt),
            createdAt: new Date()
        }).save();
        const accessToken = await this.tokenService.generateAccessToken(newUser._id);
        const refreshToken = await this.tokenService.generateRefreshToken(newUser._id);
        await this.tokenService.saveRefreshToken(newUser._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email,
            id: newUser._id
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new HttpException(AppError.WRONG_PASSWORD_OR_LOGIN, HttpStatus.BAD_REQUEST);
        }
        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new HttpException(AppError.WRONG_PASSWORD_OR_LOGIN, HttpStatus.BAD_REQUEST);
        }
        return {email: user.email};
    }

}