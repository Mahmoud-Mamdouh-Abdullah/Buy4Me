import { Encryptor } from "./Encryptor";
import { Cart } from "../Data/Models/Cart.Model";
import { CartRepository } from "../Data/Repositories/CartRepository";
import { WishRepository } from "../Data/Repositories/WishRepository";
import { UsersRepository } from "../Data/Repositories/UsersRepository";
import { Wish } from "../Data/Models/Wish.Model";
import fs from 'fs';

const userRepo = new UsersRepository();
const cartRepository = new CartRepository();
const wishRepository = new WishRepository();
export class UsersService {

    async findAll(filter: Object = {}) {
        return await userRepo.find(filter);
    }

    async create(user: any) {
        if (!await this.ifEmailExist(user.email)) {
            try {
                const encryptor = new Encryptor(user.password);
                user.password = encryptor.encrypt();
                user.created_at = new Date().toISOString();
                user.updated_at = new Date().toISOString();
                let newUser = await userRepo.insert(user);
                let cart = await this.addNewCart(newUser._id);
                let wishList = await this.addNewWishList(newUser._id);

                return {
                    user: newUser,
                    cart,
                    wishList
                };
            } catch (e: any) {
                return {
                    error: e.message
                }
            }
        }
        return {
            error: 'This email already exist !!'
        }
    }

    async addNewCart(_id: string): Promise<any> {
        let cart = new Cart({
            _id,
            products_list: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        return await cartRepository.insert(cart);
    }

    async addNewWishList(_id: string) {
        let wishList = new Wish({
            _id,
            products_list: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        return await wishRepository.insert(wishList);
    }

    ifEmailExist = async (email: string) => {
        let user = await userRepo.selectOne({ email });
        if (user === null) {
            return false;
        }
        return true;
    }

    async findById(_id: string) {
        try {
            let user = (await userRepo.selectOne({ _id }));
            let cart = await this.getCartByUserId(_id);
            let wishList = await this.getWishListByUserId(_id);
            return {
                user,
                cart,
                wishList
            };
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async getCartByUserId(_id: string): Promise<any> {
        return await cartRepository.selectOne({ _id });
    }

    async getWishListByUserId(_id: string): Promise<any> {
        return await wishRepository.selectOne({ _id });
    }

    async ifUserExist(_id: string) {
        let user: any = await userRepo.selectOne({ _id });
        if (user === null || user.error)
            return false;
        return true;
    }

    async uploadImage(_id: string, path: string) {
        const user = (await userRepo.updateOne(_id, { imgUrl: path }));
        if (user.imgUrl !== null) {
            fs.unlinkSync(user.imgUrl);
        }
        return (await userRepo.selectOne({ _id }));
    }

    async updateData(_id: string, data: Object) {
        (await userRepo.updateOne(_id, {
            ...data,
            updated_at: new Date().toISOString()
        }));
        return (await userRepo.selectOne({ _id }));
    }
}