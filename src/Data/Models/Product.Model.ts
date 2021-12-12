import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    brandName:String,
    images: [{
        url: String
    }],
    user_id: Types.ObjectId,
    created_at: String,
    updated_at: String
});

export const Product = model('Product', ProductSchema);
