import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {AuthDto} from '../auth/dto/auth.dto';
import {AuthUserResponse} from '../auth/response';
import {compare, genSalt, hash} from 'bcryptjs';
import {TokenService} from '../token/token.service';
import {AppError} from '../../exceptions/api.errors';
import {JwtPayload} from '../order/models/order.models';
import {JwtService} from '@nestjs/jwt';
import {Role} from '../../enums/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
    ) {
    }

    async createUser({email, password}: AuthDto): Promise<AuthUserResponse> {
        const existUser = await this.findUserByEmail(email);
        if (existUser) {
            throw new HttpException(AppError.ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
        }
        const salt = await genSalt(10);
        const users = await this.userModel.findOne();
        const newUser = await new this.userModel({
            email,
            passwordHash: await hash(password, salt),
            username: email.split('@')[0],
            roles: users ? [Role.User] : [Role.User, Role.Admin],
            createdAt: new Date()
        }).save();
        const accessToken = await this.tokenService.generateAccessToken(newUser._id);
        const refreshToken = await this.tokenService.generateRefreshToken(newUser._id);
        await this.tokenService.saveRefreshToken(newUser._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            email,
            username: email.split('@')[0],
            id: newUser._id
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async findUserById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
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

    async changeUsername(username, token) {
        const uniqueUsername = await this.userModel.findOne({username});
        const userData = await this.userModel.findById(this.getUserId(token));
        if (userData.username === username || !username) {
            throw new HttpException(AppError.SAME_USERNAME, HttpStatus.BAD_REQUEST);
        }
        if (uniqueUsername) {
            throw new HttpException(AppError.USERNAME_IS_NOT_UNIQUE, HttpStatus.BAD_REQUEST);
        }
        return this.userModel.findOneAndUpdate({_id: this.getUserId(token)}, {username});
    }

    async changeEmail(email, token) {
        const uniqueEmail = await this.userModel.findOne({email});
        const userData = await this.userModel.findById(this.getUserId(token));
        if (userData.email === email || !email) {
            throw new HttpException(AppError.SAME_EMAIL, HttpStatus.BAD_REQUEST);
        }
        if (uniqueEmail) {
            throw new HttpException(AppError.EMAIL_IS_NOT_UNIQUE, HttpStatus.BAD_REQUEST);
        }
        return this.userModel.findOneAndUpdate({_id: this.getUserId(token)}, {email});
    }

    getUserId(token: string): string {
        let res: JwtPayload;
        if (token.split(' ')[0] === 'Bearer') {
            res = this.jwtService.decode(token.split(' ')[1]) as JwtPayload;
        } else {
            res = this.jwtService.decode(token) as JwtPayload;
        }
        return res.id;
    }
}