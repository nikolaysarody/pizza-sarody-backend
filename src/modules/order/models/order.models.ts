import {IPizza} from '../../pizza/models/pizza.models';

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
    _id: string;
    orderNumber: number;
    userId: string;
    paymentStatus: OrderPaymentStatus,
    paymentOption: OrderPaymentOption,
    orderStatus: OrderStatus,
    cost: number
    pizzas: IPizza[]
}