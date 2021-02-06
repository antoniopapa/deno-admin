import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {JwtService} from "../services/jwt.service.ts";
import {serviceCollection} from "../services/services.ts";

export const authMiddleware = async ({cookies, response}: RouterContext, next: Function) => {
    try {
        const jwtService = serviceCollection.get(JwtService);

        const payload = await jwtService.verify(cookies);

        if (!payload) {
            response.status = 401;
            response.body = {
                message: 'Unauthenticated'
            }
            return;
        }

        await next();
    } catch (e) {
        console.log(e);
        response.status = 401;
        response.body = {
            message: 'Unauthenticated'
        }
    }
}
