import express, { IRouter } from "express";
import { all, createCategory } from "../Controllers/CategoryController";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";


export class CategoryRouter implements RouterInterface {
    getPath(): string {
        return ('/categories');
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.post('/', createCategory);
        router.get('/', all);

        return router;
    }

}