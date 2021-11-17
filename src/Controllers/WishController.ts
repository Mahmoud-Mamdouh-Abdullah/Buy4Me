import { Request, Response } from "express";
import { WishService } from "../Services/WishService";


const wishService = new WishService();

export const getWishList = async (req: Request, res: Response) => {
    const id = req.params.id;
    let cart = await wishService.getWishListById(id);
    if (cart === null || cart.error) {
        return res.send({ message: `ID '${id}' is invalid` });
    }
    res.send(cart);
}

export const updateWishList = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { products_list } = req.body;
    let cart = await wishService.editWishList(id, products_list);
    if (cart.error) {
        return res.send(cart);
    }
    res.send({ message: `WishList with ID ${id} updated successfully` });
}