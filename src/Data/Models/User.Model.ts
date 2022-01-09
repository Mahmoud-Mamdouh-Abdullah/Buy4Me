import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    created_at: String,
    updated_at: String,
    imgUrl: String
});

export const User: any = model('User', UserSchema);


