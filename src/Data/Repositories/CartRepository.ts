import { ConnectToMongo } from "../../Core/ConnectToMongo";
import { Cart } from "../Models/Cart.Model";

export class CartRepository {

    async insert(cart: any): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Cart.create(cart));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOne(filter: Object): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Cart.findOne(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async update(userId: string, body: Object): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Cart.findByIdAndUpdate(userId, body));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

}