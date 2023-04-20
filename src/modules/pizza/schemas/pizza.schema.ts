import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from 'mongoose';

export type PizzaDocument = Pizza & Document;

@Schema()
export class Pizza {
    _id: Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    img: string;

    @Prop({required: true})
    price: number;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);