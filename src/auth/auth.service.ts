import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import {USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR} from './auth.constants';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }

    async createUser(dto: AuthDto): Promise<User> {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
            _id: Date.now().toString(),
            email: dto.login,
            passwordHash: await hash(dto.password, salt),
            createdAt: new Date()
        });
        return newUser.save();
    }

    async findUser(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.findUser(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return {email: user.email};
    }

    async login(email: string) {
        const payload = {email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
