import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type PizzaDocument = Pizza & Document;

@Schema()
export class Pizza {
    @Prop()
    _id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    img: string;

    @Prop()
    price: number;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);