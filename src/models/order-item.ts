import {Model, Primary, Column} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

@Model('order_items')
export class OrderItem {
    @Primary()
    id!: number;

    @Column()
    product_title!: string;

    @Column()
    price!: number;

    @Column()
    quantity!: number;
}
