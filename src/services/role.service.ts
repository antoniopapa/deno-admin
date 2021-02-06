import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {RoleRepository} from "../repositories/role.repository.ts";
import {AbstractService} from "./abstract.service.ts";

@Service()
export class RoleService extends AbstractService {
    constructor(private roleRepository: RoleRepository) {
        super(roleRepository);
    }
}

serviceCollection.addTransient(RoleService)
