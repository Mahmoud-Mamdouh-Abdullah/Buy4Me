import { mongo } from 'mongoose';
import { User } from '../Models/User.Model';
import { ConnectToMongo } from '../../Core/ConnectToMongo';

export class UsersRepository {
    async find(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await User.find(filter));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async insert(user: any) {
        try {
            await ConnectToMongo();
            return (await User.create(user));
        } catch (e: any) {
            return {
                error: e.message
            }
        }
    }

    async selectOne(filter: Object = {}) {
        try {
            await ConnectToMongo();
            return (await User.findOne(filter).select(['name', 'email', 'address']));
        } catch (e: any) {
            return {
                error: e.message
            };
        }
    }
}