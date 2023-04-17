import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    _id:  mongoose.Types.ObjectId;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({unique: true, required: true})
    username: string;

    @Prop({required: true})
    passwordHash: string;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);