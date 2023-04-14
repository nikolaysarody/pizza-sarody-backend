import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Address, AddressDocument} from './schemas/address.schema';
import {AddressDto} from './dto/address.dto';
import {JwtPayload} from '../order/models/order.models';
import {JwtService} from '@nestjs/jwt';
import {IAddress} from './models/address.models';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
        private readonly jwtService: JwtService,
    ) {
    }

    getUserId(token: string): string {
        const res = this.jwtService.decode(token.split(' ')[1]) as JwtPayload;
        return res.id;
    }

    async getDefaultAddress(token){
        return this.addressModel.findOne({userId: this.getUserId(token), byDefault: true}).exec();
    }

    async checkDefaultAddress(token: string) {
        const addresses = await this.getUserAddresses(token);
        if (addresses.length === 1 || !addresses.some(item => item.byDefault === true) && addresses.length > 0) {
            return this.setDefaultAddress(addresses[0]._id, token);
        }
    }

    async addNewAddress(dto: AddressDto, token: string): Promise<IAddress> {
        const userAddresses = await this.getUserAddresses(token);
        const newAddress = await new this.addressModel({
            userId: this.getUserId(token), ...dto,
            createdAt: new Date(),
            byDefault: userAddresses.length === 0
        }).save();
        await this.checkDefaultAddress(token);
        return newAddress;
    }

    async getUserAddresses(token: string): Promise<IAddress[]> {
        return this.addressModel.find({userId: this.getUserId(token)}).exec();
    }

    async deleteAddress(id: string, token: string): Promise<IAddress[]> {
        await this.addressModel.findOneAndDelete({userId: this.getUserId(token), _id: id}).exec();
        await this.checkDefaultAddress(token);
        return this.getUserAddresses(token);
    }

    async setDefaultAddress(id: string, token: string) {
        await this.addressModel.findOneAndUpdate({userId: this.getUserId(token), byDefault: true}, {byDefault: false}).exec();
        await this.addressModel.findOneAndUpdate({userId: this.getUserId(token), _id: id}, {byDefault: true}).exec();
        return this.getUserAddresses(token);
    }
}