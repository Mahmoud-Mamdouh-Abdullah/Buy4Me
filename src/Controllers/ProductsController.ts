import { Request, Response } from "express";
import { ProductsService } from "../Services/ProductsService";
import { Product } from "../Data/Models/Product.Model";

const productsService = new ProductsService();


export const createProduct = async (req: Request, res: Response) => {
    const images = req.files;
    //@ts-ignore
    let imagesUrls = images?.map(image => (
        { url: image.path }
    ));
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category || imagesUrls.length === 0) {
        return res.status(400).send({ message: 'invalid or missing data' });
    }
    let product = new Product({
        title,
        description,
        price,
        category,
        images: imagesUrls,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    let savingRes = await productsService.create(product);
    if (!savingRes) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
    res.send(savingRes);
}

export const all = async (req: Request, res: Response) => {
    let products = await productsService.find();
    if (!products) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
    res.send({ products, user: req.body.user });
}

export const getByQuery = async (req: Request, res: Response) => {

}