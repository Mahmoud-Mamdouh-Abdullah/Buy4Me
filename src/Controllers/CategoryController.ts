import { Request, Response } from "express";
import { CategoryService } from "../Services/CategoryService";

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
    let name = req.body.name;
    let imgUrl = req.file?.path;
    if(!name || !imgUrl) {
        return res.send({ error: 'Invalid or missing data !!' });
    }
    let category = await categoryService.addCategory(name, imgUrl);
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