import {Model, Primary, Column} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

@Model('role_permissions')
export class RolePermission {
    @Primary()
    id!: number;

    @Column()
    role_id!: number;

    @Column()
    permission_id!: number;
}
