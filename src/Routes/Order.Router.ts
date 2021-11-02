import express, { IRouter } from "express";
import { RouterInterface } from "../Core/Interfaces/Router.Interface";
import { AuthMiddleware } from "../Middlewares/AuthenticationMiddleware";
import {
    all,
    createOrder,
    deleteOrder,
    getByOrderId,
    getOrdersByUserId,
    updateOrder
} from "../Controllers/OrdersController";


export class OrderRouter implements RouterInterface {
    getPath(): string {
        return '/orders';
    }
    getRouter(): IRouter {
        const router = express.Router();

        router.use(new AuthMiddleware().getMiddlware());

        router.get('/', all);
        router.post('/', createOrder);
        router.get('/:id', getByOrderId);
        router.put('/:id', updateOrder);
        router.delete('/:id', deleteOrder);
        router.get('/users/:user_id', getOrdersByUserId);

        return router;
    }

}