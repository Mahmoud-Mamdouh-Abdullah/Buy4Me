import { ProductsRepository } from "../Data/Repositories/ProductsRepository";



const productsRepository = new ProductsRepository();


export class ProductsService {

    async create(productObject: any): Promise<any> {
        let product = await productsRepository.insert(productObject);
        if (product) {
            return product;
        }
        return false;
    }

    async find(filter: Object = {}) {
        let productList = await productsRepository.find(filter);
        if (productList) {
            return productList;
        }
        return false;
    }

    async findOne(filter: Object) {
        let productList = await productsRepository.findOne(filter);
        if (productList) {
            return productList;
        }
        return false;
    }
}