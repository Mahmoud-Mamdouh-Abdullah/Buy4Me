import { Schema, model, mongo } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

OrderSchema.plugin(mongoosePaginate);

export const Order: any = model('Order', OrderSchema);