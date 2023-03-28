import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '../user/schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';
import {TokenService} from '../token/token.service';
import {ConfigService} from '@nestjs/config';
import {AppError} from '../../common/errors';
import {AuthUserResponse} from './response';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly userService: UserService,
        // private readonly jwtService: JwtService,
        // private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) {
    }

    async createUser(dto: AuthDto): Promise<AuthUserResponse> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser) {
            throw new BadRequestException(AppError.ALREADY_REGISTERED);
        }
        const salt = await genSalt(10);
        const newUser = await new this.userModel({
            // _id: v4(),
            email: dto.email,
            passwordHash: await hash(dto.password, salt),
            createdAt: new Date()
        });
        console.log(newUser);
        newUser.save();
        const accessToken = await this.tokenService.generateAccessToken(newUser._id);
        const refreshToken = await this.tokenService.generateRefreshToken(newUser._id);
        await this.tokenService.saveRefreshToken(newUser._id, refreshToken);

        return {
            accessToken,
            refreshToken,
            email: dto.email,
            id: newUser._id
        }
    }

    // async findUserByEmail(email: string): Promise<User> {
    //     return this.userModel.findOne({email}).exec();
    // }

    // async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
    //     const user = await this.findUserByEmail(email);
    //     if (!user) {
    //         throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
    //     }
    //     const isCorrectPassword = await compare(password, user.passwordHash);
    //     if (!isCorrectPassword) {
    //         throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
    //     }
    //     return {email: user.email};
    // }

    async login({email, password}: AuthDto): Promise<AuthUserResponse> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const validatePassword = await this.userService.validateUser(email, password);
        if (!validatePassword) {
            throw new UnauthorizedException(AppError.WRONG_PASSWORD_OR_LOGIN);
        }
        const accessToken = await this.tokenService.generateAccessToken(user._id);
        const refreshToken = await this.tokenService.generateRefreshToken(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            id: user._id
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
        const accessToken = await this.tokenService.generateAccessToken(user._id);
        const refreshToken = await this.tokenService.generateRefreshToken(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email: user.email,
            id: user._id
        }
    }
}
