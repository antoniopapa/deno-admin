import {connection, manager} from "../database/connection.ts";

interface Where {
    [key: string]: any
}

export interface FindOptions {
    where?: Where;
    include?: any,
    limit?: number,
    offset?: number
}

export abstract class AbstractRepository {
    abstract get model(): any;

    async find(options?: FindOptions) {
        let query = manager.query(this.model);

        if (options && options.where) {
            for (let key in options.where) {
                if (options.where.hasOwnProperty(key)) {
                    query.where(key, options.where[key]);
                }
            }
        }

        if (options && options.limit) {
            query.limit(options.limit);
        }

        if (options && options.offset) {
            query.offset(options.offset);
        }

        if (options && options.include) {
            query.include(options.include);
        }

        return query.all();
    }

    async findOne(options?: FindOptions) {
        let query = manager.query(this.model);

        if (options && options.where) {
            for (let key in options.where) {
                if (options.where.hasOwnProperty(key)) {
                    query.where(key, options.where[key]);
                }
            }
        }

        if (options && options.include) {
            query.include(options.include);
        }

        return query.first();
    }

    async count(options?: FindOptions) {
        let query = manager.query(this.model);

        if (options && options.where) {
            for (let key in options.where) {
                if (options.where.hasOwnProperty(key)) {
                    query.where(key, options.where[key]);
                }
            }
        }

        return query.count();
    }

    async findAndCount(options?: FindOptions): Promise<[any[], number]> {
        const result = await this.find(options);
        const count = await this.count(options);

        return [result, count]
    }

    async create(data: any) {
        return manager.save(data);
    }

    async update(id: any, data: any) {
        await manager.query(this.model).where('id', id).update(data);
    }

    async delete(where: Where) {
        let query = manager.query(this.model);

        for (let key in where) {
            if (where.hasOwnProperty(key)) {
                query.where(key, where[key]);
            }
        }

        await query.delete();
    }

    async execute(sql: string) {
        return connection.query(sql);
    }
}
