import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getJWTConfig} from '../../configs/jwt.config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from '../../strategies/jwt.strategy';
import {TokenModule} from '../token/token.module';

@Module({
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig
        }),
        PassportModule,
        ConfigModule,
        TokenModule
    ]
})
export class AuthModule {
}
