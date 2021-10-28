import { Product } from "../Models/Product.Model";
import { ConntectToMongo } from "../../Core/ConntectToMongo";


export class ProductsRepository {
    async insert(product: any): Promise<any> {
        try {
            await ConntectToMongo();
            return (await Product.create(product));
        } catch (e) {
            return false;
        }
    }

    async find(filter: Object = {}): Promise<false | any[]> {
        try {
            await ConntectToMongo();
            return (await Product.find(filter));
        } catch (e) {
            return false;
        }
    }

    async findOne(filter: Object = {}): Promise<any> {
        try {
            await ConntectToMongo();
            return (await Product.findOne(filter));
        } catch (e) {
            return false;
        }
    }
}