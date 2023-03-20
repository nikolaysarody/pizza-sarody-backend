import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthDto} from './dto/auth.dto';
import {AuthService} from './auth.service';
// import {AppError} from '../../common/errors';
import {AuthUserResponse} from './response';
import {TokenDto} from '../token/dto/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UsePipes(new ValidationPipe())
    @Post('registration')
    async register(@Body() dto: AuthDto) {
        return this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() {email, password}: AuthDto) {
        return this.authService.login({email, password});
    }

    @Post('logout')
    async logout(@Body() {refreshToken}: TokenDto) {
        return this.authService.logout(refreshToken);
    }

    @UsePipes(new ValidationPipe())
    @Post('refresh')
    async refresh(@Body() {refreshToken, email}: AuthUserResponse) {
        return this.authService.refresh(refreshToken, email);
    }
}
