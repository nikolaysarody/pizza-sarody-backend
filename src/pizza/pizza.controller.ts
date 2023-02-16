import {Body, Controller, Get} from '@nestjs/common';
import {PizzaModel} from "./pizza.model/pizza.model";

@Controller('pizza')
export class PizzaController {

    @Get()
    async get(){

    }
}
