import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Service} from 'https://deno.land/x/di@v0.1.1/mod.ts';
import {serviceCollection} from "../services/services.ts";
import {OrderService} from "../services/order.service.ts";
import {writeCSV} from 'https://deno.land/x/csv@v0.5.1/mod.ts';
import {Order} from "../models/order.ts";
import {OrderItem} from "../models/order-item.ts";

@Service()
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    async all({request, response}: RouterContext) {
        const page = request.url.searchParams.get('page') || 1;

        response.body = await this.orderService.paginate(page as any, 'order_items');
    }

    async export({response}: RouterContext) {
        const file = await Deno.open(`./csv/orders.csv`, {write: true, create: true, truncate: true});

        const rows: any[] = [
            ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        ];

        const orders: any[] = await this.orderService.all('order_items');

        orders.forEach((order: Order) => {
            rows.push([order.id.toString(), order.name, order.email, '', '', '']);

            order.order_items.forEach((item: OrderItem) => {
                rows.push(['', '', '', item.product_title, item.price, item.quantity]);
            })
        })

        await writeCSV(file, rows);

        file.close();

        response.headers.set('Content-Type', 'text/csv');
        response.headers.set('Content-disposition', 'attachment; filename=orders.csv');

        response.body = await Deno.readFile(`./csv/orders.csv`);
    }

    async chart({response}: RouterContext) {
        response.body = await this.orderService.chart();
    }
}

serviceCollection.addTransient(OrderController);
