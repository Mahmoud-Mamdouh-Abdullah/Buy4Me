import { Request, Response } from "express";
import { ProductsService } from "../Services/ProductsService";
import { UsersService } from "../Services/UsersService";
import { Product } from "../Data/Models/Product.Model";

const productsService = new ProductsService();
const userService = new UsersService();

export const createProduct = async (req: Request, res: Response) => {
    const images: any = req.files;
    let imagesUrls = images?.map((image: any) => (
        { url: image.path }
    ));
    const { title, description, price, category, user_id } = req.body;
    if (!title
        || !description
        || !price
        || !category
        || !user_id
        || imagesUrls.length === 0
        || !(await userService.ifUserExist(user_id))) {
        return res.status(406).send({ error: 'invalid or missing data' });
    }
    if (imagesUrls.length > 4) {
        return res.status(406).send({ error: "The Max Allowed Images to Upload is 4" });
    }
    let product = new Product({
        title,
        description,
        price,
        category,
        images: imagesUrls,
        user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    let savingRes = await productsService.addProduct(product);
    if (!savingRes) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
    res.send(savingRes);
}

export const all = async (req: Request, res: Response) => {
    let products = await productsService.getAll();
    if (products.error) {
        return res.status(501).send({ message: 'Internal Server Error' });
    }
    res.send({ products, user: req.body.user });
}

export const getByQuery = async (req: Request, res: Response) => {
    let query = req.params.query;
    let products = await productsService.searchProducts(query);
    if (products.error) {
        res.status(501).send('Internal server error, try again later');
    }
    res.send({ products, user: req.body.user });
}

export const deleteProduct = async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id) {
        return res.status(406).send({ error: 'Invalid or missing data' });
    }
    let deleteResult: any = await productsService.deleteProductById(id);
    if (deleteResult.error) {
        return res.status(501).send('Internal server error, try again later');
    }
    res.send({ message: `Product with id : ${id} was deleted` });
}

export const updateProduct = async (req: Request, res: Response) => {
    let id = req.params.id;
    let updateResult = await productsService.editProduct(id, req.body, req.files);
    if (updateResult === null) {
        return res.status(404).send({ error: `No Such this ID : '${id}'` });
    }
    if (updateResult.error) {
        return res.status(404).send(updateResult);
    }
    res.send(updateResult);
}