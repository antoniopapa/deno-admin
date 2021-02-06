import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {AbstractRepository} from "./abstract.repository.ts";
import {Order} from "../models/order.ts";

@Service()
export class OrderRepository extends AbstractRepository {
    model = Order;
}

serviceCollection.addTransient(OrderRepository);
