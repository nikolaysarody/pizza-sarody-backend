import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";
import {OrderPaymentOption, OrderPaymentStatus, OrderStatus} from '../models/order.models';
import {IPizza} from '../../pizza/models/pizza.models';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    _id: Types.ObjectId;

    @Prop({required: true})
    userId: Types.ObjectId;

    @Prop({required: true})
    address: Types.ObjectId;

    @Prop({required: true})
    orderNumber: number;

    @Prop({required: true})
    paymentStatus: OrderPaymentStatus;

    @Prop({required: true})
    paymentOption: OrderPaymentOption;

    @Prop({required: true})
    orderStatus: OrderStatus;

    @Prop({required: true})
    cost: number;

    @Prop({required: true})
    pizzas: IPizza[];

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);