import { ConnectToMongo } from "../../Core/ConnectToMongo";
import { Wish } from "../Models/Wish.Model"; 

export class WishRepository {

    async insert(wish: any): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Wish.create(wish));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOne(filter: Object): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Wish.findOne(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async update(userId: string, body: Object): Promise<any> {
        try {
            await ConnectToMongo();
            return (await Wish.findByIdAndUpdate(userId, body));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

}