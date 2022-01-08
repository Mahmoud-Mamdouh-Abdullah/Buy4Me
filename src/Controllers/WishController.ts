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
    let wishlist = await wishService.editWishList(id, products_list);
    if (wishlist.error) {
        return res.send(wishlist);
    }
    res.send(wishlist);
}