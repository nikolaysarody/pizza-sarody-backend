import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {JwtService} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {Token, TokenSchema} from './schemas/token.schema';

@Module({
    providers: [TokenService, JwtService],
    exports: [TokenService],
    imports: [
        MongooseModule.forFeature([
            {name: Token.name, schema: TokenSchema}
        ]),
        ConfigModule
    ]
})
export class TokenModule {
}
