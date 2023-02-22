import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {AuthDto} from './dto/auth.dto';
import {genSaltSync, hashSync} from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createUser(dto: AuthDto): Promise<User> {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            _id: Date.now().toString(),
            email: dto.login,
            passwordHash: hashSync(dto.password, salt),
            createdAt: new Date()
        });
        return newUser.save();
    }

    async findUser(email: string) {
        return this.userModel.findOne({email}).exec();
    }
}
