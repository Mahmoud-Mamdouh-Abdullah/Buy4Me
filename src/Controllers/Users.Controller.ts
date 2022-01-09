import { Request, Response } from "express";
import { User } from "../Data/Models/User.Model";
import { UsersService } from "../Services/UsersService";

const usersService = new UsersService();

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
        return res.send({ message: "some data is missing" });
    }
    const user = new User({ name, email, password, address, imgUrl: null });
    const result = await usersService.create(user);
    if (result.error) {
        return res.send({ error: result.error });
    }
    res.send(result);
}

export const uploadUserImage = async (req: Request, res: Response) => {
    const id = req.params.id;
    const path = req.file?.path;
    console.log(req.file);
    if (!path) {
        return res.send({ error: 'Invalid or missing data !!' });
    }
    const result = (await usersService.uploadImage(id, path));
    res.send(result);
}

export const updateUserData = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    if (!data.name || !data.email || !data.address) {
        res.send({ error: 'Invalid or missing data !!' });
    }
    res.send(await usersService.updateData(id, data));
}

export const all = async (req: Request, res: Response) => {
    const users = await usersService.findAll();
    res.send({ users });
}

export const getUserById = async (req: Request, res: Response) => {
    let id = req.params.id;
    let user = await usersService.findById(id);
    if (user === null || user.error) {
        return res.send({ message: `ID '${id}' is invalid` });
    }
    res.send(user);
}