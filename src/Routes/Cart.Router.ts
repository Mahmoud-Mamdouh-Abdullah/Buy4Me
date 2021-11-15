import express, { IRouter } from "express";
import { getCart, updateCart } from "../Controllers/CartController";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { AuthMiddleware } from "../Middlewares/AuthenticationMiddleware";

export class CartRouter implements RouterInterface {
    getPath(): string {
        return ('/cart');
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.use(new AuthMiddleware().getMiddlware());

        router.get('/id/:id', getCart);
        router.put('/id/:id', updateCart);

        return router;
    }

}