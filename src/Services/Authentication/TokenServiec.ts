import { ObjectId } from "mongoose";
import { TokenRepository } from "../../Data/Repositories/TokenRepository";
import { UsersRepository } from "../../Data/Repositories/UsersRepository";


const tokenRepo = new TokenRepository();
const userRepo = new UsersRepository();
export class TokenService {

    token?: string;
    user?: any;

    async findToken(filter: Object = {}) {
        return await tokenRepo.findToken(filter);
    }

    async ifTokenExist(token: string) {
        let tokenObject = await tokenRepo.findToken({ token });
        if (!tokenObject) {
            return false;
        }
        this.user = await userRepo.selectOne({ _id: tokenObject.user_id });
        return true;
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

    check(token: string) {
        this.token = token;
        return this;
    }
}