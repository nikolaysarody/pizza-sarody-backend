import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {PromoService} from './promo.service';
import {PromoDto} from './dto/promo.dto';
import {Roles} from '../../decorators/roles.decorator';
import {Role} from '../../enums/role.enum';
import {RolesGuard} from '../../guards/roles.guard';

@Controller('promo')
export class PromoController {
    constructor(private readonly promoService: PromoService) {
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('add')
    async addPromo(@Body() dto: PromoDto){
        return this.promoService.addPromo(dto);
    }

    @Post('check')
    async checkPromo(@Body() {promo}: { promo: string }) {
        return this.promoService.checkPromo(promo);
    }
}
