import { CartRepository } from "../Data/Repositories/CartRepository";

const cartRepository = new CartRepository();

export class CartService {

    async editCart(id: string, body: Array<string>) {
        let products_list = {
            products_list: body.map(_id => (
                { _id }
            )),
            updated_at:new Date().toISOString()
        };
        let cart = await cartRepository.update(id, products_list);
        if (cart === null) {
            return {
                error: 'Invalid or missing ID'
            }
        }
        return cart;
    }

    async getCartById(_id: string) {
        return await cartRepository.selectOne({ _id });
    }
}