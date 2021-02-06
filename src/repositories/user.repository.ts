import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {AbstractRepository} from "./abstract.repository.ts";
import {User} from "../models/user.ts";

@Service()
export class UserRepository extends AbstractRepository {
    model = User;
}

serviceCollection.addTransient(UserRepository);
