import express, { IRouter } from "express";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";


export class UserRouter implements RouterInterface{
    getPath(): string {
        return '/users';
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.get('/', );
        router.get('/:id', );

        return router;
    }
}