import express, { IRouter } from "express";
import { login } from "../Controllers/AuthController";
import { all, createUser, getById } from "../Controllers/Users.Controller";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
export class UserRouter implements RouterInterface{
    getPath(): string {
        return '/users';
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.get('/', all);
        router.get('/id/:id', getById);
        router.post('/', createUser);
        router.post('/login', login);

        return router;
    }
}