import { UserRepository } from "../../Data/Models/User.Model";
import { Encryptor } from "../Encryptor";
import { TokenService } from "./TokenServiec";
import { Token } from "../../Data/Models/Token.Model";

const userRepo = new UserRepository();
const tokenService = new TokenService();

export class AuthChecker {

    user: any;

    constructor(private email: string, private password: string) {
    }

    async checkLogin() {
        this.user = await userRepo.findUser({ email: this.email });
        let encryptedPassword = new Encryptor(this.password).encrypt();
        if (!this.user) {
            return false;
        }
        if (this.user.password !== encryptedPassword) {
            return false;
        }
        return true;
    }

    generateToken() {
        return new Encryptor(JSON.stringify({ ...this.user, date: new Date() })).encrypt();
    }

    async saveTokenAndGet() {
        let token = this.generateToken();
        let userToken = await tokenService.findToken({ user_id: this.user._id });
        if (userToken) {
            await tokenService.delete(userToken._id.toString());
        }
        let tokenObject = new Token({
            token: token,
            user_id: this.user._id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        tokenService.create(tokenObject);
        return token;
    }
}