import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthController} from './auth/auth.controller';
import {AuthModule} from './auth/auth.module';
import {PizzaModule} from './pizza/pizza.module';
import {ActionModule} from './action/action.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/pizza'),
        AuthModule,
        PizzaModule,
        ActionModule
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {
}
