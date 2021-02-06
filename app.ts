import {Application} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import router from "./src/routes/routes.ts";
import {oakCors} from 'https://deno.land/x/cors@v1.2.1/mod.ts';

const app = new Application();

app.use(oakCors({
    credentials: true,
    origin: /^.+localhost:(3000|4200|8080)$/,
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port: 8000});
console.log('Listening to port: 8000');
// await connection.disconnect();
