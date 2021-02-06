import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {RoleService} from "../services/role.service.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {Role} from "../models/role.ts";
import {RolePermissionService} from "../services/role-permission.service.ts";
import {RolePermission} from "../models/role-permission.ts";

@Service()
export class RoleController {
    constructor(
        private roleService: RoleService,
        private rolePermissionService: RolePermissionService
    ) {
    }

    async all({response}: RouterContext) {
        response.body = await this.roleService.all();
    }

    async create({request, response}: RouterContext) {
        const {name, permissions} = await request.body().value;

        const role = new Role();
        role.name = name;

        const createdRole = await this.roleService.create(role);

        const rolePermissions = permissions.map((permission_id: number) => {
            const rolePermission = new RolePermission();
            rolePermission.permission_id = permission_id;
            rolePermission.role_id = createdRole.id;
            return rolePermission;
        });

        await this.rolePermissionService.create(rolePermissions);

        response.body = createdRole;
    }

    async get({params, response}: RouterContext) {
        const {role_permissions, ...role}: any = await this.roleService.findOne({id: params.id}, 'role_permissions');

        response.body = {
            ...role,
            permissions: role_permissions.map((rp: RolePermission) => ({id: rp.permission_id}))
        };
    }

    async update({params, request, response}: RouterContext) {
        const body = await request.body().value;

        const role = await this.roleService.update(params.id, body);

        await this.rolePermissionService.delete({
            role_id: params.id
        });

        const rolePermissions = body.permissions.map((permission_id: number) => {
            const rolePermission = new RolePermission();
            rolePermission.permission_id = permission_id;
            rolePermission.role_id = params.id as any;
            return rolePermission;
        });

        await this.rolePermissionService.create(rolePermissions);

        response.body = role;
    }

    async delete({params, response}: RouterContext) {
        await this.rolePermissionService.delete({
            role_id: params.id
        });

        await this.roleService.delete({id: params.id});

        response.status = 204;
    }
}

serviceCollection.addTransient(RoleController);
