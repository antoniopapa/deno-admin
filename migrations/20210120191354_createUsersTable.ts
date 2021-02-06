import {Schema} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    await schema.createTable('users', (table) => {
        table.id();
        table.varchar('first_name');
        table.varchar('last_name');
        table.varchar('email').unique();
        table.varchar('password');
    })
}

export async function down(schema: Schema) {
    await schema.dropTable('users');
}
