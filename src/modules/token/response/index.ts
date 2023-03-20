import {IsNumber, IsString} from 'class-validator';

export class TokenResponse {
    @IsString()
    id: string;

    @IsNumber()
    iat: number;

    @IsNumber()
    exp: number;
}