import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type ActionDocument = Action & Document;

@Schema()
export class Action {
    _id: Types.ObjectId;

    @Prop({unique: true, required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop()
    text?: string;

    @Prop()
    clickable: boolean;

    @Prop()
    img: string;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const ActionSchema = SchemaFactory.createForClass(Action);