import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from 'mongoose';
import {User} from '../../user/schemas/user.schema';

export type TokenDocument = Token & mongoose.Document;

@Schema()
export class Token {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({required: true})
    refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token);