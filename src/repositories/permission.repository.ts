import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {AbstractRepository} from "./abstract.repository.ts";
import {Permission} from "../models/permission.ts";

@Service()
export class PermissionRepository extends AbstractRepository {
    model = Permission;
}

serviceCollection.addTransient(PermissionRepository);
