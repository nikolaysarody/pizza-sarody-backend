import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Action, ActionDocument} from './schemas/action.schema';

@Injectable()
export class ActionService {
    constructor(@InjectModel(Action.name) private actionModel: Model<ActionDocument>) {}

    async getAll(): Promise<Action[]>{
        return this.actionModel.find().exec();
    }
}
