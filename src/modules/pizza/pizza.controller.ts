import {Controller, Get, UseGuards} from '@nestjs/common';
import {PizzaService} from './pizza.service';
import {Pizza} from './schemas/pizza.schema';
import {Roles} from '../../decorators/roles.decorator';
import {Role} from '../../enums/role.enum';
import {RolesGuard} from '../../guards/roles.guard';

// import {JwtAuthGuard} from '../../guards/jwt.guard';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<Pizza[]>{
        return this.pizzaService.getAll();
    }
}
