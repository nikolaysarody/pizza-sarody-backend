import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthDto} from './dto/auth.dto';
import {AuthService} from './auth.service';
// import {AppError} from '../../common/errors';
import {AuthUserResponse} from './response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UsePipes(new ValidationPipe())
    @Post('registration')
    async register(@Body() dto: AuthDto) {
        // const oldUser = await this.authService.findUserByEmail(dto.login);
        // if (oldUser) {
        //     throw new BadRequestException(AppError.ALREADY_REGISTERED);
        // }
        return this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() {email, password}: AuthDto) {
        // const {email} = await this.authService.validateUser(email, password);
        return this.authService.login({email, password});
    }

    @UsePipes(new ValidationPipe())
    @Post('refresh')
    async refresh(@Body() {refresh_token, email}: AuthUserResponse) {
        // const {email} = await this.authService.validateUser(email, password);
        return this.authService.refresh(refresh_token, email);
    }
}
