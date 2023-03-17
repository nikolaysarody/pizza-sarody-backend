import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { ActionService } from './action.service';
import {Action, ActionSchema} from './schemas/action.schema';

@Module({
  controllers: [ActionController],
  imports: [
    MongooseModule.forFeature([
      {name: Action.name, schema: ActionSchema}
    ])
  ],
  providers: [ActionService]
})
export class ActionModule {}
