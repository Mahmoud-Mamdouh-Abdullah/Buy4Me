import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name:String
});


export const Category = model('Category', CategorySchema);