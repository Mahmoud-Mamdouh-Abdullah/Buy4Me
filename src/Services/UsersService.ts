import { UsersRepository } from "../Data/Repositories/UsersRepository";
import { Encryptor } from "./Encryptor";

const userRepo = new UsersRepository();
export class UsersService {
    async findAll(filter: Object = {}) {
        const users = await userRepo.find(filter);
        if (users) {
            return users;
        }
        return false;
    }

    async create(user: any) {
        const encryptor = new Encryptor(user.password);
        user.password = encryptor.encrypt();
        user.created_at = new Date().toISOString();
        user.updated_at = new Date().toISOString();
        let newUser = await userRepo.createUser(user);
        if(newUser) {
            return newUser;
        }
        return false;
    }

    async findById(id: string) {
        let user = (await userRepo.getUserById(id));
        console.log(user);
        if (user) {
            return user;
        }
        return false;
    }
}