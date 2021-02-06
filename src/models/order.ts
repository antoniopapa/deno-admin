import {Model, Primary, Column, HasMany} from "https://deno.land/x/cotton@v0.7.5/mod.ts";
import {OrderItem} from "./order-item.ts";

@Model('orders')
export class Order {
    @Primary()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    email!: string;

    @Column()
    created_at!: string;

    @Column()
    updated_at!: string;

    @HasMany(() => OrderItem, 'order_id')
    order_items!: OrderItem[];

    get name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    get total(): number {
        return this.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
}
