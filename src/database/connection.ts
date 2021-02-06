import {connect} from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export const connection = await connect({
    type: "mysql",
    port: 3306,
    database: "deno_admin",
    hostname: "localhost",
    username: "root",
    password: "rootroot"
});

export const manager = connection.getManager();
