import { ConnectToMongo } from "../../Core/ConnectToMongo";
import { Order } from "../Models/Order.Model";


export class OrdersRepository {
    async insert(order: any) {
        try {
            await ConnectToMongo();
            return (await Order.create(order));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOne(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Order.findOne(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectAll(filter: Object = {}, options: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Order.paginate(filter, options));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async deleteOne(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Order.deleteOne(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async deleteMany(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Order.deleteMany(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOneAndUpdate(id: string, body: Object) {
        try {
            await ConnectToMongo();
            return (await Order.findByIdAndUpdate(id, body));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }
}