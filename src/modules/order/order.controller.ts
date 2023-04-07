import {Body, Controller, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe, Headers} from '@nestjs/common';
import {OrderDto} from './dto/order.dto';
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
    async addNewOrder(@Body() dto: OrderDto, @Headers('authorization') token) {
        return this.orderService.addNewOrder(dto, token);
    }

    @UsePipes(new ValidationPipe())
    @Patch('cancel')
    async cancelOrder(@Body() {orderNumber}: {orderNumber: number}, @Headers('authorization') token) {
        return this.orderService.cancelOrder(orderNumber, token);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Get('get')
    async getUserOrders(@Headers('authorization') token) {
        return this.orderService.getUserOrders(token);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('delete')
    async deleteOrder(@Body() {orderNumber}: {orderNumber: number}, @Headers('authorization') token) {
        return this.orderService.deleteOrder(orderNumber, token);
    }
}
