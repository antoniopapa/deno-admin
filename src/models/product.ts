import {Model, Primary, Column} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

@Model('products')
export class Product {
    @Primary()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    image!: string;

    @Column()
    price!: number;
}
