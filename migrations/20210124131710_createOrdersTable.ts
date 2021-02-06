import {Schema} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    await schema.createTable('orders', (table) => {
        table.id();
        table.varchar('first_name');
        table.varchar('last_name');
        table.varchar('email');
        table.timestamps();
    })
}

export async function down(schema: Schema) {
    await schema.dropTable('orders')
}
