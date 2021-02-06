import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {validate, required, isEmail} from 'https://deno.land/x/validasaur@v0.15.0/mod.ts';

export const LoginValidation = async ({request, response}: RouterContext, next: Function) => {
    const body = await request.body().value;

    const [passes, errors] = await validate(body, {
        email: [required, isEmail],
        password: required
    });

    if (!passes) {
        response.status = 400;
        response.body = errors;
        return;
    }

    await next();
}
