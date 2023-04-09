import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    _id: mongoose.Types.ObjectId;

    @Prop()
    userId: string;

    @Prop()
    street: string;

    @Prop()
    house: string;

    @Prop()
    entrance: number;

    @Prop()
    apartment: number;

    @Prop()
    floor: number

    @Prop()
    byDefault: boolean;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);