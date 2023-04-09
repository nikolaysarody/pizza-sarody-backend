import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Address, AddressDocument} from './schemas/address.schema';
import {AddressDto} from './dto/address.dto';
import {JwtPayload} from '../order/models/order.models';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
        private readonly jwtService: JwtService,
    ) {
    }

    getUserId(token: string): string {
        const res = this.jwtService.decode(token.split(' ')[1]) as JwtPayload;
        return res._id;
    }

    async addNewAddress(dto: AddressDto, token: string) {
        const userAddresses = await this.getUserAddresses(token);
        return new this.addressModel({userId: this.getUserId(token),...dto, createdAt: new Date(), byDefault: userAddresses.length === 0}).save();
    }

    async getUserAddresses(token: string) {
        return this.addressModel.find({userId: this.getUserId(token)}).exec();
    }

    async deleteAddress(id: string, token: string) {
        return this.addressModel.findOneAndDelete({userId: this.getUserId(token), _id: id}).exec();
    }

    async setDefaultAddress(id: string, token: string) {
        return this.addressModel.findOneAndDelete({userId: this.getUserId(token), _id: id}).exec();
    }
}