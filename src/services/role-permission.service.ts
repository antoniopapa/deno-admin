import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {AbstractService} from "./abstract.service.ts";
import {RolePermissionRepository} from "../repositories/role-permission.repository.ts";

@Service()
export class RolePermissionService extends AbstractService {
    constructor(private rolePermissionRepository: RolePermissionRepository) {
        super(rolePermissionRepository);
    }
}

serviceCollection.addTransient(RolePermissionService)
