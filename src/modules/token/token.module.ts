import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {JwtService} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
    providers: [TokenService, JwtService],
    exports: [TokenService],
    imports: [ConfigModule]
})
export class TokenModule {
}
