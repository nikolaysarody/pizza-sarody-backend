import {Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from './user.service';
import {JwtAuthGuard} from '../../guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('change-username')
    async changeUsername(@Body() {username}: { username: string }, @Req() req: Request) {
        const {refreshToken} = req.cookies;
        return this.userService.changeUsername(username, refreshToken);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('change-email')
    async changeEmail(@Body() {email}: { email: string }, @Req() req: Request) {
        const {refreshToken} = req.cookies;
        return this.userService.changeEmail(email, refreshToken);
    }
}
