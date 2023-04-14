import {Body, Controller, Get, HttpCode, Post, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import {Response, Request} from 'express';
import {AuthDto} from './dto/auth.dto';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @UsePipes(new ValidationPipe())
    @Post('registration')
    async registration(@Body() {email, password}: AuthDto, @Res({passthrough: true}) res: Response) {
        const userData = await this.userService.createUser({email, password});
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return userData;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() {email, password}: AuthDto, @Res({passthrough: true}) res: Response) {
        const userData = await this.authService.login({email, password});
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return userData;
    }

    @Get('logout')
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refreshToken} = req.cookies;
        const token = await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return token;
    }

    @UsePipes(new ValidationPipe())
    @Get('refresh')
    async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refreshToken} = req.cookies;
        const userData = await this.authService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return userData;
    }
}
