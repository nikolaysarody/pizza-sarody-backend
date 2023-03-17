import {IsString} from 'class-validator';

export class AuthUserResponse {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;

    @IsString()
    email: string;

    @IsString()
    _id: string;
}