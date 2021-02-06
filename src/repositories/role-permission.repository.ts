import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {AbstractRepository} from "./abstract.repository.ts";
import {RolePermission} from "../models/role-permission.ts";

@Service()
export class RolePermissionRepository extends AbstractRepository {
    model = RolePermission;
}

serviceCollection.addTransient(RolePermissionRepository);
