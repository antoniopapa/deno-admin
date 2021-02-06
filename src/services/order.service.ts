import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "./services.ts";
import {AbstractService} from "./abstract.service.ts";
import {OrderRepository} from "../repositories/order.repository.ts";
import {Order} from "../models/order.ts";

@Service()
export class OrderService extends AbstractService {
    constructor(private orderRepository: OrderRepository) {
        super(orderRepository);
    }

    async paginate(page = 1, include = '') {
        const {data, meta} = await super.paginate(page, include);

        return {
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta
        }
    }

    async chart() {
        return this.orderRepository.execute(`
            SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum
            FROM orders o JOIN order_items oi on o.id = oi.order_id
            GROUP BY date
        `);
    }
}

serviceCollection.addTransient(OrderService)
