import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {AbstractRepository} from "./abstract.repository.ts";
import {Product} from "../models/product.ts";

@Service()
export class ProductRepository extends AbstractRepository {
    model = Product;
}

serviceCollection.addTransient(ProductRepository);
