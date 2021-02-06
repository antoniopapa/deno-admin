import {Schema} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    await schema.createTable('role_permissions', (table) => {
        table.id();
        table.foreignId('role_id', 'roles');
        table.foreignId('permission_id', 'permissions');
    })
}

export async function down(schema: Schema) {
    await schema.dropTable('role_permissions');
}
