import {IsString} from 'class-validator';

export class AuthUserResponse {
    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;

    @IsString()
    email: string;

    @IsString()
    id: string;
}

export class AuthRefreshResponse {
    @IsString()
    refreshToken: string;

    @IsString()
    email: string;
}