import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: String,
    imgUrl: String
});


export const Category = model('Category', CategorySchema);