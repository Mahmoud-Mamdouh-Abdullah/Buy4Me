import { Request, Response } from "express";
import { CartService } from "../Services/CartService";


const cartService = new CartService();

export const getCart = async (req: Request, res: Response) => {
    const id = req.params.id;
    let cart = await cartService.getCartById(id);
    if (cart === null || cart.error) {
        return res.send({ message: `ID '${id}' is invalid` });
    }
    res.send(cart);
}

export const updateCart = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { products_list } = req.body;
    let cart = await cartService.editCart(id, products_list);
    if (cart.error) {
        return res.send(cart);
    }
    res.send({ message: `Cart with ID ${id} updated successfully` });
}