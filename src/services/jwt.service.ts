import {create, verify, getNumericDate} from 'https://deno.land/x/djwt@v2.1/mod.ts';
import {Cookies} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";

@Service()
export class JwtService {
    async create(id: number) {
        const key = Deno.env.get('key') || '';
        const payload = {
            id,
            exp: getNumericDate(60 * 60 * 24) // 1 day
        }

        return await create({alg: "HS512", typ: "JWT"}, payload, key);
    }

    async verify(cookies: Cookies) {
        const jwt = cookies.get('jwt') || '';
        const key = Deno.env.get('key') || '';

        if (!jwt) {
            return false;
        }

        return await verify(jwt, key, "HS512");
    }
}

serviceCollection.addTransient(JwtService);
