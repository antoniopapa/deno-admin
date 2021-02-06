import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {Role} from "../models/role.ts";
import {AbstractRepository} from "./abstract.repository.ts";

@Service()
export class RoleRepository extends AbstractRepository {
    model = Role;
}

serviceCollection.addTransient(RoleRepository);
