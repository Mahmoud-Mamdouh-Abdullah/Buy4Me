import { Schema, mongo, model } from "mongoose";
import { ConntectToMongo } from "../../Core/ConntectToMongo";

const TokenSchema = new Schema({
    token: String,
    user_id: Schema.Types.ObjectId,
    created_at: String,
    updated_at: String
})

export const Token: any = model('Token', TokenSchema);

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