import { Product } from "../Models/Product.Model";
import { ConnectToMongo } from "../../Core/ConnectToMongo";


export class ProductsRepository {
    async insert(product: any): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Product.create(product));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOne(filter: Object = {}, fields: string = ''): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Product.findOne(filter).select(fields));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectAll(filter: Object = {}): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Product.find(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async deleteOne(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Product.findOneAndDelete(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async deleteMany(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await Product.deleteMany(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOneAndUpdate(id: string, body: Object) {
        try {
            await ConnectToMongo();
            return (await Product.findByIdAndUpdate(id, body));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }


}