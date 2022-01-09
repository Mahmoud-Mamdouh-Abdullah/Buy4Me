import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    brandName: String,
    images: [{
        url: String
    }],
    user_id: Types.ObjectId,
    created_at: String,
    updated_at: String
});

ProductSchema.plugin(mongoosePaginate);

export const Product: any = model('Product', ProductSchema);
