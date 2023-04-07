import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Order, OrderDocument} from './schemas/order.schema';
import {IOrder, JwtPayload, OrderStatus} from './models/order.models';
import {OrderDto} from './dto/order.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private readonly jwtService: JwtService,
    ) {
    }

    generateOrderNumber() {
        return Math.round(Math.random() * (999999 - 100000) + 100000);
    }

    getUserId(token: string): string {
        const res = this.jwtService.decode(token.split(' ')[1]) as JwtPayload;
        return res._id;
    }

    async getUserOrders(token: string): Promise<IOrder[]> {
        return this.orderModel.find({userId: this.getUserId(token)}).exec();
    }

    async addNewOrder(dto: OrderDto, token: string) {
        const userOrders = await this.getUserOrders(token);
        let orderNumber = this.generateOrderNumber();
        while (userOrders.some(item => item.orderNumber === orderNumber)) {
            orderNumber = this.generateOrderNumber();
        }
        return new this.orderModel({userId: this.getUserId(token), orderNumber, ...dto, createdAt: new Date()}).save();
    }

    async cancelOrder(orderNumber: number, token: string) {
        return this.orderModel.findOneAndUpdate({
            userId: this.getUserId(token),
            orderNumber
        }, {orderStatus: OrderStatus.Canceled}).exec();
    }

    async deleteOrder(orderNumber: number, token: string) {
        return this.orderModel.findOneAndDelete({userId: this.getUserId(token), orderNumber}).exec();
    }
}