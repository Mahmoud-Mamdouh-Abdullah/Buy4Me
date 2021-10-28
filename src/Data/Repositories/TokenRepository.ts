import { mongo } from "mongoose";
import { Token } from "../Models/Token.Model";
import { ConntectToMongo } from "../../Core/ConntectToMongo";

export class TokenRepository {

    async createToken(token: any) {
        try {
            await ConntectToMongo();
            return (await Token.create(token));
        } catch (e) {
            return false;
        }
    }

    async findToken(filter: Object = {}) {
        try {
            await ConntectToMongo();
            return (await Token.findOne(filter));
        } catch (e) {
            return false;
        }
    }

    async deleteToken(id: string) {
        try {
            let _id = new mongo.ObjectId(id);
            await ConntectToMongo();
            return (await Token.deleteOne({ _id }));
        } catch (e) {
            return false;
        }
    }
}