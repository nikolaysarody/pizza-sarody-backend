import {Controller, Get} from '@nestjs/common';
import {PizzaService} from './pizza.service';
import {Pizza} from './schemas/pizza.schema';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    @Get()
    async getAll(): Promise<Pizza[]>{
        return this.pizzaService.getAll();
    }
}
