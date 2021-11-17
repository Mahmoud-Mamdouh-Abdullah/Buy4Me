import { model, Schema, Types } from "mongoose";

const WishSchema = new Schema({
    _id: Types.ObjectId,
    products_list: [{
        _id: Types.ObjectId
    }],
    created_at: String,
    updated_at: String
});

export const Wish = model('Wish', WishSchema);