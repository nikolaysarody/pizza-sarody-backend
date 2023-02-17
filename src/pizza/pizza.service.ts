import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Pizza, PizzaDocument} from "./schemas/pizza.schema";
import {Model} from "mongoose";


@Injectable()
export class PizzaService {
    constructor(@InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>) {
    }

    async getAll(): Promise<Pizza[]>{
        return this.pizzaModel.find().exec();
    }
}