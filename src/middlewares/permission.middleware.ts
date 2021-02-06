import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {JwtService} from "../services/jwt.service.ts";
import {serviceCollection} from "../services/services.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {UserService} from "../services/user.service.ts";
import {RoleService} from "../services/role.service.ts";
import {PermissionService} from "../services/permission.service.ts";
import {RolePermission} from "../models/role-permission.ts";

@Service()
export class PermissionMiddleware {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private roleService: RoleService,
        private permissionService: PermissionService
    ) {
    }

    async hasAccess({request, cookies, response}: RouterContext, next: Function, page: string) {
        const {id}: any = await this.jwtService.verify(cookies);

        const user: any = await this.userService.findOne({id});
        const role: any = await this.roleService.findOne({id: user.role_id}, 'role_permissions');

        for (const rp of role.role_permissions) {
            const permission: any = await this.permissionService.findOne({id: rp.permission_id});

            if (request.method === 'GET') {
                if (permission.name === `view_${page}` || permission.name === `edit_${page}`) {
                    await next();
                    return;
                }
            } else {
                if (permission.name === `edit_${page}`) {
                    await next();
                    return;
                }
            }
        }

        response.status = 401;
        response.body = {
            message: 'Unauthorized.'
        }
    }
}

serviceCollection.addTransient(PermissionMiddleware);
