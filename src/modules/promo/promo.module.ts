import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {PromoService} from './promo.service';
import {Promo, PromoSchema} from './schemas/promo.schema';
import {PromoController} from './promo.controller';
import {UserModule} from '../user/user.module';

@Module({
    providers: [PromoService],
    controllers: [PromoController],
    imports: [
        MongooseModule.forFeature([
            {name: Promo.name, schema: PromoSchema}
        ]),
        UserModule
    ]
})
export class PromoModule {

}
