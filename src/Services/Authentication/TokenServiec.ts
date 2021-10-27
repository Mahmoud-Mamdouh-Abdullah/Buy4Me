import { ObjectId } from "mongoose";
import { TokenRepository } from "../../Data/Models/Token.Model";


const tokenRepo = new TokenRepository();

export class TokenService {

    async findToken(filter: Object = {}) {
        let token = await tokenRepo.findToken(filter);
        if (token) {
            return token;
        }
        return false;
    }

    async create(tokenObject: any) {
        let token = await tokenRepo.createToken(tokenObject);
        if (token) {
            return token;
        }
        return false;
    }

    async delete(id: string) {
        let result = await tokenRepo.deleteToken(id);
        if (result) {
            return result;
        }
        return false;
    }
}