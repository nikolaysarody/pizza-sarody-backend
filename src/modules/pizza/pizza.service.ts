import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Pizza, PizzaDocument} from "./schemas/pizza.schema";

@Injectable()
export class PizzaService {
    constructor(@InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>) {}

    async getAll(): Promise<Pizza[]>{
        return this.pizzaModel.find().exec();
    }
}