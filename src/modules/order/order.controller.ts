import {Body, Controller, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {OrderCancelDto, OrderDto} from './dto/order.dto';
import {OrderService} from './order.service';
import {JwtAuthGuard} from '../../guards/jwt.guard';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('add')
    async addNewOrder(@Body() dto: OrderDto) {
        return this.orderService.addNewOrder(dto);
    }

    @UsePipes(new ValidationPipe())
    @Patch('cancel')
    async getOrderById(@Body() dto: OrderCancelDto) {
        return this.orderService.cancelOrder(dto);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post()
    async getAllOrders(@Body() {userId}) {
        return this.orderService.getUserOrders(userId);
    }
}
