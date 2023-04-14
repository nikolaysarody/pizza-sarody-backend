import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserService} from './user.service';
import {User, UserSchema} from './schemas/user.schema';
import {TokenModule} from '../token/token.module';

@Module({
    providers: [UserService],
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
