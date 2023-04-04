import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {OrderDto} from './dto/order.dto';
import {OrderService} from './order.service';
import {JwtAuthGuard} from '../../guards/jwt.guard';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {
    }

    // @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('add')
    async addNewOrder(@Body() dto: OrderDto) {
        return this.orderService.addNewOrder(dto);
    }

    // @UsePipes(new ValidationPipe())
    // @Get('get/:id')
    // async getOrderById(@Body() dto: OrderDto) {
    //     // return this.userService.createUser(dto);
    // }

    @UsePipes(new ValidationPipe())
    @Get()
    async getAllOrders(@Body() {userId}) {
        return this.orderService.getUserOrders(userId);
    }
}
