import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AppController} from './app.controller';
import {AppService} from './app.service';
// import {AuthController} from './modules/auth/auth.controller';
import {AuthModule} from './modules/auth/auth.module';
import {PizzaModule} from './modules/pizza/pizza.module';
import {ActionModule} from './modules/action/action.module';
import {ConfigModule} from "@nestjs/config";
import {TokenModule} from './modules/token/token.module';
import {UserModule} from './modules/user/user.module';
import {OrderModule} from './modules/order/order.module';
import {AddressModule} from './modules/address/address.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        AuthModule,
        PizzaModule,
        ActionModule,
        TokenModule,
        UserModule,
        OrderModule,
        AddressModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
