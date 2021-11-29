import { connect } from "mongoose"
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
export const ConnectToMongo = async () => {
    try {
        //@ts-ignore
        await connect(mongoUrl);
    } catch {
        throw new Error('Failed to connect to server');
    }
}