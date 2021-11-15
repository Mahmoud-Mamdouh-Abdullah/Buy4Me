import { model, Schema, Types } from "mongoose";

const CartSchema = new Schema({
    _id: Types.ObjectId,
    products_list: [{
        _id: Types.ObjectId
    }],
    created_at: String,
    updated_at: String
});

export const Cart = model('Cart', CartSchema);