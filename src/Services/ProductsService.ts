import { ProductsRepository } from "../Data/Repositories/ProductsRepository";



const productsRepository = new ProductsRepository();


export class ProductsService {

    async addProduct(productObject: any): Promise<any> {
        return (await productsRepository.insert(productObject));
    }

    async getAll() {
        return (await productsRepository.selectAll());
    }

    async searchProducts(query: string) {
        let filter = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ]
        };
        return (await productsRepository.selectAll(filter));
    }
}