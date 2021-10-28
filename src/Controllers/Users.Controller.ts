import { Request, Response } from "express";
import { User } from "../Data/Models/User.Model";
import { UsersService } from "../Services/UsersService";

const usersService = new UsersService();


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
        return res.send({ message: "some data is missing" });
    }
    const user = new User({ name, email, password, address });
    const result = await usersService.create(user);
    if(!result) {
        return res.send({ message: "An error occured, please try again later" });
    }
    res.send(result);
}

export const all = async (req: Request, res: Response) => {
    const users = await usersService.findAll();
    res.send({ users });
}

export const getById = async (req: Request, res: Response) => {
    let id = req.params.id;
    let user = await usersService.findById(id);
    if(!user) {
        return res.send({message:`ID '${id}' is invalid`});
    }
    res.send({ user });
}