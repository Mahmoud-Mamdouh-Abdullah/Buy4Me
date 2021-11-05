import { mongo } from 'mongoose';
import { User } from '../Models/User.Model';
import { ConnectToMongo } from '../../Core/ConnectToMongo';

export class UsersRepository {
    async find(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await User.find(filter));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async createUser(user: any) {
        try {
            await ConnectToMongo();
            return (await User.create(user));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async selectOne(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await User.findOne(filter));
        } catch (e: any) {
            return {
                error: e.message
            };
        }
    }

    async getUserById(id: string) {
        try {
            const _id = new mongo.ObjectId(id);
            await ConnectToMongo();
            return (await User.findById(_id));
        } catch (e: any) {
            return false;
        }
    }
}