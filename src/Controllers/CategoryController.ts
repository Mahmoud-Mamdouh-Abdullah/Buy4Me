import { Request, Response } from "express";
import { CategoryService } from "../Services/CategoryService";

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
    let name = req.body.name;
    let category = await categoryService.addCategory(name);
    if (category.error) {
        return res.send({ error: 'Something wrong was happened !!' });
    }
    res.send({ message: `Category ${name} has added successfully` });
}

export const all = async (req: Request, res: Response) => {
    let categories: any = await categoryService.getAll();
    if (categories.error) {
        return res.send({ error: 'Something wrong was happened !!' });
    }
    res.send(categories);
}