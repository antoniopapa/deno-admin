import {Model, Primary, Column} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

@Model('permissions')
export class Permission {
    @Primary()
    id!: number;

    @Column()
    name!: string;
}
