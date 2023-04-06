import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Order, OrderDocument} from './schemas/order.schema';
import {IOrder, OrderStatus} from './models/order.models';
import {OrderCancelDto, OrderDto} from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {
    }

    generateOrderNumber() {
        return Math.round(Math.random() * (999999 - 100000) + 100000);
    }

    async getUserOrders(userId: string): Promise<IOrder[]> {
        return this.orderModel.find({userId}).exec();
    }

    async addNewOrder(dto: OrderDto): Promise<IOrder> {
        const userOrders = await this.getUserOrders(dto.userId);
        let orderNumber = this.generateOrderNumber();
        while (userOrders.some(item => item.orderNumber === orderNumber)) {
            orderNumber = this.generateOrderNumber();
        }
        return await new this.orderModel({
            orderNumber,
            userId: dto.userId,
            paymentStatus: dto.paymentStatus,
            paymentOption: dto.paymentOption,
            orderStatus: dto.orderStatus,
            cost: dto.cost,
            pizzas: dto.pizzas,
            createdAt: new Date()
        }).save();
    }

    async cancelOrder({userId, orderNumber}: OrderCancelDto) {
        return await this.orderModel.findOneAndUpdate({userId, orderNumber}, {orderStatus: OrderStatus.Canceled}).exec();
    }
}