import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {OrderPaymentOption, OrderPaymentStatus, OrderStatus} from '../models/order.models';
import {IPizza} from '../../pizza/models/pizza.models';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    _id: mongoose.Types.ObjectId;

    @Prop()
    userId: string;

    @Prop()
    orderNumber: number;

    @Prop()
    paymentStatus: OrderPaymentStatus;

    @Prop()
    paymentOption: OrderPaymentOption;

    @Prop()
    orderStatus: OrderStatus;

    @Prop()
    cost: number;

    @Prop()
    pizzas: IPizza[];

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);