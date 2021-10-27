import { Schema, model, mongo } from 'mongoose';
import { ConntectToMongo } from '../../Core/ConntectToMongo';


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    created_at: String,
    updated_at: String
});

export const User: any = model('User', UserSchema);

export class UserRepository {
    async find(filter: Object = {}) {
        try {
            await ConntectToMongo();
            return (await User.find(filter));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async createUser(user: any) {
        try {
            await ConntectToMongo();
            return (await User.create(user));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findUser(filter: Object = {}) {
        try {
            await ConntectToMongo();
            return (await User.findOne(filter));
        } catch (e: any) {
            return false;
        }
    }

    async getUserById(id: string) {
        try {
            const _id = new mongo.ObjectId(id);
            await ConntectToMongo();
            return (await User.findById(_id));
        } catch (e: any) {
            return false;
        }
    }
}
