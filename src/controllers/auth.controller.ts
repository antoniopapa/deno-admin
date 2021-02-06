import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {User} from "../models/user.ts";
import {hash, compareSync} from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import {JwtService} from "../services/jwt.service.ts";
import {UserService} from "../services/user.service.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";

@Service()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async register({request, response}: RouterContext) {
        const body = await request.body().value;

        const user = new User();
        user.first_name = body.first_name;
        user.last_name = body.last_name;
        user.email = body.email;
        user.password = await hash(body.password);
        user.role_id = 1;

        response.body = await this.userService.create(user);
    }

    async login({request, response, cookies}: RouterContext) {
        const {email, password} = await request.body().value;

        const user: any = await this.userService.findOne({email});

        if (!user) {
            response.status = 404;
            response.body = {
                message: 'User not found!'
            }
            return;
        }

        if (!compareSync(password, user.password)) {
            response.status = 401;
            response.body = {
                message: 'Incorrect password!'
            }
            return;
        }

        const jwt = await this.jwtService.create(user.id);

        cookies.set('jwt', jwt, {httpOnly: true});

        response.body = {
            jwt
        };
    }

    async user({response, cookies}: RouterContext) {
        const {id}: any = await this.jwtService.verify(cookies);

        const {password, ...result}: any = await this.userService.findOne({id});

        response.body = result;
    }

    async logout({response, cookies}: RouterContext) {
        cookies.delete('jwt');

        response.body = {
            message: 'success'
        }
    }

    async updateInfo({request, response, cookies}: RouterContext) {
        const body = await request.body().value;

        const {id}: any = await this.jwtService.verify(cookies);

        response.body = await this.userService.update(id, body);
    }

    async updatePassword({request, response, cookies}: RouterContext) {
        const {password, password_confirm} = await request.body().value;

        if (password !== password_confirm) {
            response.status = 400;
            response.body = {
                message: 'Passwords do not match!'
            }
        }

        const {id}: any = await this.jwtService.verify(cookies);

        response.body = await this.userService.update(id, {
            password: await hash(password)
        });
    }
}

serviceCollection.addTransient(AuthController);
