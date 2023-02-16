import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PizzaController} from './pizza/pizza.controller';
import {AuthController} from './auth/auth.controller';
import {AuthModule} from './auth/auth.module';
import {PizzaModule} from './pizza/pizza.module';
import {ActionModule} from './action/action.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://admin:admin@127.0.0.1:27017/pizza'),
        AuthModule,
        PizzaModule,
        ActionModule
    ],
    controllers: [AppController, PizzaController, AuthController],
    providers: [AppService],
})
export class AppModule {
}
