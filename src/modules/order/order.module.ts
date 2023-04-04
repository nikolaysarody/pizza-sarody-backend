import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {OrderSchema, Order} from './schemas/order.schema';
import {OrderService} from './order.service';
import {OrderController} from './order.controller';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getJWTConfig} from '../../configs/jwt.config';

@Module({
    providers: [OrderService],
    controllers: [OrderController],
    imports: [
        MongooseModule.forFeature([
            {name: Order.name, schema: OrderSchema}
        ])
    ]
})
export class OrderModule {

}
