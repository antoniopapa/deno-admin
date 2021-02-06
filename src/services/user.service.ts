import {UserRepository} from "../repositories/user.repository.ts";
import {User} from "../models/user.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {AbstractService} from "./abstract.service.ts";

@Service()
export class UserService extends AbstractService {
    constructor(private userRepository: UserRepository) {
        super(userRepository);
    }

    async all(include = '') {
        const users: any[] = await super.all(include);

        return users.map((user: User) => {
            const {password, ...data} = user;

            return data;
        });
    }

    async paginate(page = 1, include = '') {
        const {data, meta} = await super.paginate(page, include);

        return {
            data: data.map((user: User) => {
                const {password, ...data} = user;

                return data;
            }),
            meta
        }
    }

    async create(data: any) {
        const {password, ...result} = await super.create(data);

        return result;
    }

    async update(id: any, data: any) {
        const {password, ...result}: any = await super.update(id, data);

        return result;
    }
}

serviceCollection.addTransient(UserService);
