import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {PermissionService} from "../services/permission.service.ts";
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";

@Service()
export class PermissionController {
    constructor(private permissionService: PermissionService) {
    }

    async all({response}: RouterContext) {
        response.body = await this.permissionService.all();
    }
}

serviceCollection.addTransient(PermissionController);
