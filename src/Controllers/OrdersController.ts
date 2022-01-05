import { Request, Response } from "express";
import { Order } from "../Data/Models/Order.Model";
import { OrdersService } from "../Services/OrdersService";


const ordersService = new OrdersService();

export const createOrder = async (req: Request, res: Response) => {
    const { products_list, location, amount, user_id } = req.body;

    if (!products_list || !location || !amount || !user_id || products_list.length === 0) {
        return res.send({ error: 'Invalid or missing data' });
    }

    const orderObject = new Order({
        products_list,
        location,
        amount,
        user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    let result = await ordersService.addOrder(orderObject);
    if (result.error) {
        return res.send(result);
    }
    res.send({ msg: `A new order is placed with ID : ${result._id}` });
}

export const all = async (req: Request, res: Response) => {
    let orders = await ordersService.getAll();
    res.send(orders);
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
    let userId = req.params.user_id;
    let orders = await ordersService.getOrdersByUserID(userId);
    res.send(orders);
}

export const getByOrderId = async (req: Request, res: Response) => {
    let id = req.params.id;
    let orders = await ordersService.getOrderByID(id);
    if (!orders) {
        res.send({ msg: 'Invalid or missing data' });
    }
    res.send(orders);
}

export const updateOrder = async (req: Request, res: Response) => {
    let id = req.params.id;
    let orderBody = req.body.product;
    if (!orderBody || !id) {
        return res.status(406).send({ error: 'Invalid or missing data!' });
    }
    orderBody.updated_at = new Date().toISOString();
    let updatingResult = await ordersService.editOrder(id, orderBody);
    if (updatingResult.error) {
        return res.status(501).send({ error: 'Internal Server Error' });
    }
    res.send(updatingResult);
}

export const deleteOrder = async (req: Request, res: Response) => {
    let id = req.params.id;
    let result: any = await ordersService.removeOrder(id);
    if (result.error) {
        res.send({ msg: 'Invalid or missing data' });
    }
    if (result.deletedCount === 0) {
        res.send({ msg: 'No Such this ID' });
    }
    res.send({ msg: 'Order Deleted Successfully' });
}