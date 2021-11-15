import express, { IRouter } from "express";
import { MulterMiddleware } from "../Middlewares/MulterMiddleware";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { all, createProduct, deleteProduct, getByQuery, updateProduct } from "../Controllers/ProductsController";
import { AuthMiddleware } from "../Middlewares/AuthenticationMiddleware";



export class ProductRouter implements RouterInterface {
    getPath(): string {
        return '/products';
    }
    getRouter(): IRouter {
        const router = express.Router();

        const upload = (new MulterMiddleware()).getMiddlware();
        router.use(upload.array('images', 4));

        router.use(new AuthMiddleware().getMiddlware());

        router.get('/', all);
        router.get('/search/:query', getByQuery);
        router.post('/', createProduct);
        router.delete('/id/:id', deleteProduct);
        router.put('/id/:id', updateProduct);
        return router;
    }

}