import {IsArray, IsNumber, IsString} from 'class-validator';
import {IPizza} from '../../pizza/models/pizza.models';

export class PromoDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    discount: number;

    @IsArray()
    items: IPizza[];

    @IsString()
    img: string;

    expire?: Date;
}