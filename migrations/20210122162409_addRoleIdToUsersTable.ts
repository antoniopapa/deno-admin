import {Schema, ColumnBuilder} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
    const roleId = new ColumnBuilder('role_id', 'integer');

    await schema.addColumn('users', roleId);
}

export async function down(schema: Schema) {
    await schema.dropColumn('users', 'role_id');
}
