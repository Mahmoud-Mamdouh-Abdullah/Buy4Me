import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    images: [{
        url: String
    }],
    created_at: String,
    updated_at: String
});

export const Product = model('Product', ProductSchema);
