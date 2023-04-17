import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserService} from './user.service';
import {User, UserSchema} from './schemas/user.schema';
import {TokenModule} from '../token/token.module';
import {UserController} from './user.controller';
import {JwtService} from '@nestjs/jwt';

@Module({
    providers: [UserService, JwtService],
    controllers: [UserController],
    exports: [UserService],
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        TokenModule
    ]
})
export class UserModule {
}
