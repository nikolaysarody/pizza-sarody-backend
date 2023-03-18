import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';
import {TokenService} from '../token/token.service';
import {ConfigService} from '@nestjs/config';
import {AppError} from '../../common/errors';
import {AuthUserResponse} from './response';
import {v4} from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) {
    }

    async createUser(dto: AuthDto): Promise<AuthUserResponse> {
        const existUser = await this.findUserByEmail(dto.email);
        if (existUser) {
            throw new BadRequestException(AppError.ALREADY_REGISTERED);
        }
        const salt = await genSalt(10);
        const newUser = await new this.userModel({
            // _id: v4(),
            email: dto.email,
            passwordHash: await hash(dto.password, salt),
            createdAt: new Date()
        }).save();
        const accessToken = await this.tokenService.generateAccessToken(newUser._id);
        const refreshToken = await this.tokenService.generateRefreshToken(newUser._id);
        await this.tokenService.saveRefreshToken(newUser._id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            email: dto.email,
            id: newUser._id
        }
        // const userDto = new AuthDto(newUser);
        // await newUser.save();
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        return {email: user.email};
    }

    async login({email, password}: AuthDto): Promise<AuthUserResponse> {
        // const payload = {email};
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const validatePassword = await this.validateUser(email, password);
        if (!validatePassword) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        return {
            access_token: await this.tokenService.generateAccessToken(user.id),
            refresh_token: await this.tokenService.generateRefreshToken(user.id),
            email: user.email,
            id: user.id
        }
    }

    async refresh(token, email) {
        if (!token) {
            throw new UnauthorizedException();
        }
        const userData = this.tokenService.validateRefreshToken(token);
        if (!userData) {
            throw new UnauthorizedException();
        }
        const user = await this.findUserByEmail(email);
        return {
            access_token: await this.tokenService.generateAccessToken(user.id),
            refresh_token: await this.tokenService.generateRefreshToken(user.id),
            email: user.email,
            _id: user.id
        }
    }
}