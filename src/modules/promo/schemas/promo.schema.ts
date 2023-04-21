import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from 'mongoose';
import {Pizza} from '../../pizza/schemas/pizza.schema';

export type PromoDocument = Promo & Document;

@Schema()
export class Promo {
    _id: Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    discount: number;

    @Prop({type: Types.ObjectId, ref: 'Pizza'})
    items: Pizza[];

    @Prop({required: true})
    img: string;

    @Prop()
    expire: Date;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);