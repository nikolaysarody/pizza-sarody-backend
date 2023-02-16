import {Controller, Get} from '@nestjs/common';

@Controller('action')
export class ActionController {
    @Get('get')
    async get(){

    }
}
