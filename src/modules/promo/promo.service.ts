import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Promo, PromoDocument} from './schemas/promo.schema';
import {AppError} from '../../exceptions/api.errors';
import {PromoDto} from './dto/promo.dto';

@Injectable()
export class PromoService {
    constructor(
        @InjectModel(Promo.name) private promoModel: Model<PromoDocument>,
    ) {}

    async checkPromo(title: string) {
        const res = await this.promoModel.findOne({title});
        if (!res) {
            throw new HttpException(AppError.PROMO_IS_NOT_CORRECT, HttpStatus.BAD_REQUEST);
        }
        return res;
    }

    async addPromo(dto: PromoDto) {
        const res = await this.promoModel.findOne({title: dto.title});
        if (res) {
            throw new HttpException(AppError.PROMO_IS_EXISTS, HttpStatus.BAD_REQUEST);
        }
        return this.promoModel.create({...dto});
    }
}