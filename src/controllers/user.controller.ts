import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {UserService} from "../services/user.service.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {hash} from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {User} from "../models/user.ts";

@Service()
export class UserController {
    constructor(private userService: UserService) {
    }

    async all({request, response}: RouterContext) {
        const page = request.url.searchParams.get('page') || 1;

        response.body = await this.userService.paginate(page as any, 'role');
    }

    async create({request, response}: RouterContext) {
        const {first_name, last_name, email, role_id} = await request.body().value;

        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = await hash('1234');
        user.role_id = role_id;

        response.body = await this.userService.create(user);
    }

    async get({request, response, params}: RouterContext) {
        const {password, ...data}: any = await this.userService.findOne({id: params.id}, 'role');

        response.body = data;
    }

    async update({request, response, params}: RouterContext) {
        const body = await request.body().value;

        response.body = await this.userService.update(params.id, body);
    }

    async delete({request, response, params}: RouterContext) {
        await this.userService.delete({id: params.id});

        response.status = 204;
    }
}

serviceCollection.addTransient(UserController);
