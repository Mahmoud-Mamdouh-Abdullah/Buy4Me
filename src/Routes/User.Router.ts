import express, { IRouter } from "express";
import { login } from "../Controllers/AuthController";
import { all, createUser, getUserById, updateUserData, uploadUserImage } from "../Controllers/Users.Controller";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { MulterMiddleware } from "../Middlewares/MulterMiddleware";
export class UserRouter implements RouterInterface{
    getPath(): string {
        return '/users';
    }
    getRouter(): IRouter {
        const router = express.Router();

        const upload = (new MulterMiddleware()).getMiddlware();
        router.use(upload.single('imgUrl'));
        
        router.get('/', all);
        router.get('/id/:id', getUserById);
        router.post('/', createUser);
        router.post('/login', login);
        router.put('/uploadImg/:id', uploadUserImage);
        router.put('/update/:id', updateUserData);

        return router;
    }
}