import {Model, Primary, Column, HasMany} from "https://deno.land/x/cotton@v0.7.5/mod.ts";
import {RolePermission} from "./role-permission.ts";

@Model('roles')
export class Role {
    @Primary()
    id!: number;

    @Column()
    name!: string;

    @HasMany(() => RolePermission, 'role_id')
    role_permissions!: RolePermission[];
}
