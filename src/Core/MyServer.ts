import express, { Request, Response } from 'express';
import { UserRouter } from '../Routes/User.Router';
import { AppMiddlwareInterface } from './Interfaces/AppMiddleware.Interface';
import { RouterInterface } from './Interfaces/Router.Interface';


export class MyServer {
    private readonly _server = express();

    constructor() {
        this._server.use(express.json());
        this._server.get('/', function (req: Request, res: Response) {
            res.send({ messages: 'this is the E-Commerce Server Endpoint' });
        });
    }

    addRouter(router: RouterInterface) {
        this._server.use(router.getPath(), router.getRouter());
    }

    addMiddleware(middlware: AppMiddlwareInterface) {
        this._server.use(middlware.getMiddlware());
    }

    listen(port: number) {
        this._server.listen(port, () => {
            console.log(`server running ...`);
            console.log(`server listen on port 5000`);
        });
    }

}