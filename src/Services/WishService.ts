import { WishRepository } from "../Data/Repositories/WishRepository";

const wishRepository = new WishRepository();

export class WishService {

    async editWishList(id: string, body: Array<string>) {
        let products_list = {
            products_list: body.map(_id => (
                { _id }
            )),
            updated_at:new Date().toISOString()
        };
        await wishRepository.update(id, products_list);
        let wishlist = this.getWishListById(id);
        if (wishlist === null) {
            return {
                error: 'Invalid or missing ID'
            }
        }
        return wishlist;
    }

    async getWishListById(_id: string) {
        return await wishRepository.selectOne({ _id });
    }
}