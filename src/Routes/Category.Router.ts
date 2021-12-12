import express, { IRouter } from "express";
import { all, createCategory } from "../Controllers/CategoryController";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { MulterMiddleware } from "../Middlewares/MulterMiddleware";


export class CategoryRouter implements RouterInterface {
    getPath(): string {
        return ('/categories');
    }
    getRouter(): IRouter {
        const router = express.Router();

        const upload = (new MulterMiddleware()).getMiddlware();
        router.use(upload.single('imgUrl'));

        router.post('/', createCategory);
        router.get('/', all);

        return router;
    }

}