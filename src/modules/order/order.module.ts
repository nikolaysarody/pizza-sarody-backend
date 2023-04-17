import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {OrderSchema, Order} from './schemas/order.schema';
import {OrderService} from './order.service';
import {OrderController} from './order.controller';
import {JwtService} from '@nestjs/jwt';
import {AddressModule} from '../address/address.module';
import {UserModule} from '../user/user.module';

@Module({
    providers: [OrderService, JwtService],
    controllers: [OrderController],
    imports: [
        MongooseModule.forFeature([
            {name: Order.name, schema: OrderSchema}
        ]),
        AddressModule,
        UserModule
    ]
})
export class OrderModule {

}
