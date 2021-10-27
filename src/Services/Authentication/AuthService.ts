import { AuthChecker } from "./AuthChecker";


export class AuthService {

    login(email: string, password: string) {
        return (new AuthChecker(email, password));
    }
}