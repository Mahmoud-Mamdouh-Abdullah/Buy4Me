import { ProductsRepository } from "../Data/Repositories/ProductsRepository";
import fs from 'fs';


const productsRepository = new ProductsRepository();


export class ProductsService {

    async addProduct(productObject: any): Promise<any> {
        return (await productsRepository.insert(productObject));
    }

    async getAll() {
        return (await productsRepository.selectAll());
    }

    async getPodcutsByCategory(category: string) {
        return (await productsRepository.selectAll({ category }));
    }

    async getProductById(_id: string) {
        return (await productsRepository.selectOne({ _id }));
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

    async deleteProductById(id: string) {
        let deletedProduct = await productsRepository.deleteOne({ _id: id });
        if (deletedProduct !== null && deletedProduct['error'] === undefined) {
            let imgUrls = deletedProduct.images.map((img: any) => img.url);
            imgUrls.forEach((url: string) => {
                fs.unlinkSync(url);
            });
        }
        return {
            deletedId: (deletedProduct._id).toString()
        }
    }

    async editProduct(id: string, reqBody: any, reqFiles: any) {
        let body: any = this.validteUpdateReques(reqBody, reqFiles);
        if (body.error) {
            return body;
        }
        let oldProduct = (await productsRepository.selectOneAndUpdate(id, body));
        if (oldProduct !== null && oldProduct['error'] === undefined) {
            let imgUrls = oldProduct.images.map((img: any) => img.url);
            imgUrls.forEach((url: string) => {
                fs.unlinkSync(url);
            });
        }
        return (await productsRepository.selectOne({ _id: oldProduct._id }));
    }

    validteUpdateReques(reqBody: any, reqFiles: any) {
        let body: any = {};
        const { title, description, price, category } = reqBody;
        if (title) {
            body['title'] = title
        }
        if (description) {
            body['description'] = description
        }
        if (price) {
            body['price'] = price
        }
        if (category) {
            body['category'] = category
        }
        if (reqFiles && reqFiles.length > 0) {
            const images: any = reqFiles;
            let imagesUrls = images?.map((image: any) => (
                { url: image.path }
            ));
            body['images'] = imagesUrls;
        }
        if (Object.keys(body).length === 0) {
            return { error: 'Missing Data !!' };
        }
        return body;
    }
}