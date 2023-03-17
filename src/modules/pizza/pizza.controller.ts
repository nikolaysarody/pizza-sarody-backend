import {Controller, Get, UseGuards} from '@nestjs/common';
import {PizzaService} from "./pizza.service";
import {Pizza} from "./schemas/pizza.schema";
// import {JwtAuthGuard} from '../auth/guards/jwt.guard';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Pizza[]>{
        return this.pizzaService.getAll();
    }
}
