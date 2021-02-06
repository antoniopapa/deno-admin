import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {multiParser} from 'https://deno.land/x/multiparser@v2.0.3/mod.ts';

@Service()
export class ImageController {

    async upload({request, response}: RouterContext) {
        const form = await multiParser(request.serverRequest);

        if (form) {
            const image = form.files.image as any;

            await Deno.writeFile(`./uploads/${image.filename}`, image.content);

            response.body = {
                url: `http://localhost:8000/api/uploads/${image.filename}`
            }
            return;
        }

        response.body = {
            message: 'success'
        }
    }

    async image({params, response}: RouterContext) {
        response.body = await Deno.readFile(`./uploads/${params.file}`);
    }
}

serviceCollection.addTransient(ImageController);
