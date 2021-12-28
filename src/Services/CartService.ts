import { CartRepository } from "../Data/Repositories/CartRepository";
import { ProductsRepository } from "../Data/Repositories/ProductsRepository";

const cartRepository = new CartRepository();
const productRepository = new ProductsRepository();
export class CartService {

    async editCart(id: string, body: Array<Object>) {
        let products_list = {
            products_list: body.map((productItem: any) => (
                {
                    _id: productItem._id,
                    qty: productItem.qty
                }
            )),
            updated_at: new Date().toISOString()
        };
        await cartRepository.update(id, products_list);
        let cart = await this.getCartById(id);
        if (cart === null) {
            return {
                error: 'Invalid or missing ID'
            }
        }
        return cart;
    }

    async getCartById(_id: string): Promise<any> {
        const cart = await cartRepository.selectOne({ _id });
        const total = await this.getCartTotal(cart.products_list);

        return {
            productList: cart.products_list,
            itemsCount: cart.products_list.length,
            total
        };
    }

    async getCartTotal(items: any) {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            const product = await productRepository.selectOne({ _id: items[i]._id }, 'price');
            total += product.price * items[i].qty;
        }
        return total;
    }
}