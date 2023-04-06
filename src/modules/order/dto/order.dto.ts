import {IsEnum, IsNumber, IsString, IsArray} from 'class-validator';
import {OrderPaymentOption, OrderPaymentStatus, OrderStatus} from '../models/order.models';
import {IPizza} from '../../pizza/models/pizza.models';

export class OrderDto {
    @IsString()
    userId: string;

    @IsEnum(OrderPaymentStatus)
    paymentStatus: OrderPaymentStatus;

    @IsEnum(OrderPaymentOption)
    paymentOption: OrderPaymentOption;

    @IsEnum(OrderStatus)
    orderStatus: OrderStatus;

    @IsNumber()
    cost: number;

    @IsArray()
    pizzas: IPizza[];
}

export class OrderCancelDto {
    @IsString()
    userId: string;

    @IsNumber()
    orderNumber: number;
}