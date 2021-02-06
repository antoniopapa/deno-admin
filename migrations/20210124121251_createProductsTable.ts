import {Schema} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    await schema.createTable('products', (table) => {
        table.id();
        table.varchar('title');
        table.text('description');
        table.varchar('image');
        table.integer('price');
    })
}

export async function down(schema: Schema) {
    await schema.dropTable('products');
}
