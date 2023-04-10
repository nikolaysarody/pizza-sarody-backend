import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AddressService} from './address.service';
import {AddressController} from './address.controller';
import {Address, AddressSchema} from './schemas/address.schema';
import {JwtService} from '@nestjs/jwt';


@Module({
    providers: [AddressService, JwtService],
    exports: [AddressService],
    controllers: [AddressController],
    imports: [
        MongooseModule.forFeature([
            {name: Address.name, schema: AddressSchema}
        ])
    ]
})
export class AddressModule {

}
