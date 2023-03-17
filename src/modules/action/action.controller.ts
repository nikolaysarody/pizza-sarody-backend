import {Controller, Get} from '@nestjs/common';
import {ActionService} from './action.service';
import {Action} from './schemas/action.schema';

@Controller('action')
export class ActionController {
    constructor(private readonly actionService: ActionService) {}

    @Get()
    async getAll(): Promise<Action[]>{
        return this.actionService.getAll();
    }
}
