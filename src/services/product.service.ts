import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {AbstractService} from "./abstract.service.ts";
import {ProductRepository} from "../repositories/product.repository.ts";

@Service()
export class ProductService extends AbstractService {
    constructor(private productRepository: ProductRepository) {
        super(productRepository);
    }
}

serviceCollection.addTransient(ProductService)
