import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Role} from '../enums/role.enum';
import {ROLES_KEY} from '../decorators/roles.decorator';
import {UserService} from '../modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {cookies} = context.switchToHttp().getRequest();
        const userId = this.userService.getUserId(cookies.refreshToken);
        const user = await this.userService.findUserById(userId);

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
