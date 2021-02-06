import {Schema} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    await schema.createTable('order_items', (table) => {
        table.id();
        table.foreignId('order_id', 'orders');
        table.varchar('product_title');
        table.integer('price');
        table.integer('quantity');
    })
}

export async function down(schema: Schema) {
    await schema.dropTable('order_items');
}
