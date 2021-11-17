import express, { IRouter } from "express";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { AuthMiddleware } from "../Middlewares/AuthenticationMiddleware";
import { getWishList, updateWishList } from "../Controllers/WishController";

export class WishRouter implements RouterInterface {
    getPath(): string {
        return ('/wishlist');
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.use(new AuthMiddleware().getMiddlware());

        router.get('/id/:id', getWishList);
        router.put('/id/:id', updateWishList);

        return router;
    }

}