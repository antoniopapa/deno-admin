import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {ProductService} from "../services/product.service.ts";
import {Product} from "../models/product.ts";

@Service()
export class ProductController {
    constructor(private productService: ProductService) {
    }

    async all({request, response}: RouterContext) {
        const page = request.url.searchParams.get('page') || 1;

        response.body = await this.productService.paginate(page as any);
    }

    async create({request, response}: RouterContext) {
        const {title, description, image, price} = await request.body().value;
        const product = new Product();
        product.title = title;
        product.description = description;
        product.image = image;
        product.price = price;

        response.body = await this.productService.create(product);
    }

    async get({params, response}: RouterContext) {
        response.body = await this.productService.findOne({id: params.id});
    }

    async update({params, request, response}: RouterContext) {
        const body = await request.body().value;

        response.body = await this.productService.update(params.id, body);
    }

    async delete({params, response}: RouterContext) {
        await this.productService.delete({id: params.id});

        response.status = 204;
    }
}

serviceCollection.addTransient(ProductController);
