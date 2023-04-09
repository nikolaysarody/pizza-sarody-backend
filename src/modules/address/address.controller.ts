import {Body, Controller, Get, Headers, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AddressService} from './address.service';
import {JwtAuthGuard} from '../../guards/jwt.guard';
import {AddressDto} from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('add')
    async addNewAddress(@Body() dto: AddressDto, @Headers('authorization') token) {
        return this.addressService.addNewAddress(dto, token);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Get('get')
    async getUserAddresses(@Headers('authorization') token) {
        return this.addressService.getUserAddresses(token);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('delete')
    async deleteAddress(@Body() {id}: {id: string}, @Headers('authorization') token) {
        return this.addressService.deleteAddress(id, token);
    }

    //
    // @UsePipes(new ValidationPipe())
    // @Patch('cancel')
    // async getOrderById(@Body() dto: OrderCancelDto) {
    //     return this.orderService.cancelOrder(dto);
    // }
    //
}
