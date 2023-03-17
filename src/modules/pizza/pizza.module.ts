import {Module} from '@nestjs/common';
import {PizzaService} from "./pizza.service";
import {PizzaController} from "./pizza.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Pizza, PizzaSchema} from "./schemas/pizza.schema";

@Module({
    providers: [PizzaService],
    controllers: [PizzaController],
    imports: [
        MongooseModule.forFeature([
            {name: Pizza.name, schema: PizzaSchema}
        ])
    ]
})
export class PizzaModule {

}
