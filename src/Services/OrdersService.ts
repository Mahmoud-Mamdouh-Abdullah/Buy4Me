import { Order } from "../Data/Models/Order.Model";
import { OrdersRepository } from "../Data/Repositories/OrdersRepository";


const orderRepository = new OrdersRepository();

export class OrdersService {

    async addOrder(orderObject: any) {
        let order = await orderRepository.insert(orderObject);
        return order;
    }

    async getAll() {
        let orders: any = await orderRepository.selectAll();
        return orders;
    }

    async getOrdersByUserID(user_id: string) {
        let orders: any = await orderRepository.selectAll({ user_id });
        return orders;
    }

    async getOrderByID(_id: string) {
        let order: any = await orderRepository.selectOne({ _id });
        return order;
    }

    async editOrder(_id: string, body: Object) {
        let editingRes = await orderRepository.selectOneAndUpdate(_id, body);
        return editingRes;
    }

    async removeOrder(_id: string) {
        let removingRes = await orderRepository.deleteOne({ _id });
        return removingRes;
    }
}