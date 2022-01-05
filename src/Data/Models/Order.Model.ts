import { Schema, model, mongo } from 'mongoose';

const OrderSchema = new Schema({
    products_list: [{
        _id: Schema.Types.ObjectId,
        qty: Number
    }],
    user_id: Schema.Types.ObjectId,
    location: String,
    amount: Number,
    created_at: String,
    updated_at: String
});

export const Order = model('Order', OrderSchema);