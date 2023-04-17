import {IsString} from 'class-validator';
import mongoose from 'mongoose';

export class AuthUserResponse {
    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    id: mongoose.Types.ObjectId;
}

export class AuthRefreshResponse {
    @IsString()
    refreshToken: string;

    @IsString()
    email: string;
}