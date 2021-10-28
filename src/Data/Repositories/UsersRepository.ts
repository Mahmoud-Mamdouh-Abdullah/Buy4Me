import { mongo } from 'mongoose';
import { User } from '../Models/User.Model';
import { ConntectToMongo } from '../../Core/ConntectToMongo';

export class UsersRepository {
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