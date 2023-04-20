import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    _id: Types.ObjectId;

    @Prop({required: true})
    userId: Types.ObjectId;

    @Prop({required: true})
    street: string;

    @Prop({required: true})
    house: string;

    @Prop({required: true})
    entrance: number;

    @Prop({required: true})
    apartment: number;

    @Prop({required: true})
    floor: number

    @Prop()
    byDefault: boolean;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);