import {IsNumber, IsString} from 'class-validator';

export class AddressDto {
    @IsString()
    street: string;

    @IsString()
    house: string;

    @IsNumber()
    entrance: number;

    @IsNumber()
    apartment: number;

    @IsNumber()
    floor: number
}