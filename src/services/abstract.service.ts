import {AbstractRepository} from "../repositories/abstract.repository.ts";

export abstract class AbstractService {
    protected constructor(protected readonly repository: AbstractRepository) {
    }

    async all(include = '') {
        return this.repository.find({
            include
        });
    }

    async paginate(page = 1, include = '') {
        const limit = 15;

        const [data, total] = await this.repository.findAndCount({
            limit,
            offset: (page - 1) * limit,
            include
        });

        return {
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        }
    }

    async findOne(condition: any, include = '') {
        return this.repository.findOne({
            where: condition,
            include
        });
    }

    async create(data: any) {
        return await this.repository.create(data);
    }

    async update(id: any, data: any) {
        await this.repository.update(id, data);

        return await this.repository.findOne({
            where: {id}
        });
    }

    async delete(condition: any) {
        await this.repository.delete(condition);
    }
}
