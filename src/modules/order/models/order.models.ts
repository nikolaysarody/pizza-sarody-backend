import {IPizza} from '../../pizza/models/pizza.models';
import mongoose from 'mongoose';

export enum OrderPaymentStatus {
    Paid = 'Оплачен',
    NotPaid = 'Не оплачен'
}

export enum OrderStatus {
    Delivered = 'Доставляется',
    Done = 'Готов',
    Cooking = 'Готовится',
    Waited = 'Ожидает оплаты',
    Canceled = 'Отменен'
}

export enum OrderPaymentOption {
    Site = 'Онлайн на сайте',
    Courier = 'Картой курьеру',
    Cash = 'Наличными курьеру'
}

export interface IOrder {
    _id: mongoose.Types.ObjectId;
    orderNumber: number;
    addressId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    paymentStatus: OrderPaymentStatus,
    paymentOption: OrderPaymentOption,
    orderStatus: OrderStatus,
    cost: number
    pizzas: IPizza[]
}

export interface JwtPayload {
    _id: string;
    iat: number;
    exp: number
}