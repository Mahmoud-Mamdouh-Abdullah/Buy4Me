import { NextFunction, Request, Response } from "express";
import { TokenService } from "../Services/Authentication/TokenServiec";
import { AppMiddlwareInterface } from "../Core/Interfaces/AppMiddleware.Interface";


export class AuthMiddleware implements AppMiddlwareInterface {
    getMiddlware() {
        return async (req: Request, res: Response, next: NextFunction) => {
            let token = req.header('token');
            if (!token) {
                return res.status(401).send({ messages: 'unauthorized user' });
            }
            const tokenCheck = new TokenService().check(token);
            if (!(await tokenCheck.ifTokenExist(token))) {
                return res.status(401).send({ messages: 'unauthorized user' });
            }
            req.body.user = tokenCheck.user;
            next();
        }
    }
}