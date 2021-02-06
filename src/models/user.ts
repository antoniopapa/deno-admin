import {Model, Primary, Column, BelongsTo} from "https://deno.land/x/cotton@v0.7.5/mod.ts";
import {Role} from "./role.ts";

@Model('users')
export class User {
    @Primary()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    role_id!: number;

    @BelongsTo(() => Role, 'role_id')
    role!: Role;
}
