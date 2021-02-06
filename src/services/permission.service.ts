import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {AbstractService} from "./abstract.service.ts";
import {PermissionRepository} from "../repositories/permission.repository.ts";

@Service()
export class PermissionService extends AbstractService {
    constructor(private permissionRepository: PermissionRepository) {
        super(permissionRepository);
    }
}

serviceCollection.addTransient(PermissionService)
