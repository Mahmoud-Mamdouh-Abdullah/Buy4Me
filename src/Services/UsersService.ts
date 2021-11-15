import { CartRepository } from "../Data/Repositories/CartRepository";
import { UsersRepository } from "../Data/Repositories/UsersRepository";
import { Encryptor } from "./Encryptor";
import { Cart } from "../Data/Models/Cart.Model";


const userRepo = new UsersRepository();
const cartRepository = new CartRepository();

export class UsersService {
    async findAll(filter: Object = {}) {
        return await userRepo.find(filter);
    }

    async create(user: any) {
        if (!await this.ifEmailExist(user.email)) {
            const encryptor = new Encryptor(user.password);
            user.password = encryptor.encrypt();
            user.created_at = new Date().toISOString();
            user.updated_at = new Date().toISOString();
            let newUser = await userRepo.insert(user);
            let cart = await this.addNewCart(newUser._id);

            return {
                user: newUser,
                cart
            };
        }
        return {
            error: 'This email already exist !!'
        }
    }

    async addNewCart(id: string): Promise<any> {
        let cart = new Cart({
            _id: id,
            products_list: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        return await cartRepository.insert(cart);
    }

    ifEmailExist = async (email: string) => {
        let user = await userRepo.selectOne({ email });
        if (user === null) {
            return false;
        }
        return true;
    }

    findUserAndIfHasCart = async (_id: string) => {
        let user = await this.findById(_id);
        if (user === null || user.error) {
            return false;
        }
        let cart = await cartRepository.selectOne({ _id });
        console.log(cart);
        if (cart.error || cart._id) {
            return false;
        }
        return true;
    }

    async findById(_id: string) {
        let user = (await userRepo.selectOne({ _id }));
        return user;
    }

    async ifUserExist(_id: string) {
        let user: any = await userRepo.selectOne({ _id });
        if (user === null || user.error)
            return false;
        return true;
    }
}