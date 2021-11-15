import { ConnectToMongo } from "../../Core/ConnectToMongo";
import { Category } from "../Models/Category.Model";

export class CategoryRepository {

    async insert(name: string) {
        try {
            await ConnectToMongo();
            return await Category.create({ name });
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectAll(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return await Category.find(filter);
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }
}