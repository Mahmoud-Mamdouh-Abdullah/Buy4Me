import { connect } from "mongoose"

const mongoUrl = 'mongodb://localhost:27017/e-commerce';
export const ConnectToMongo = async () => {
    try {
        await connect(mongoUrl);
    } catch {
        throw new Error('Failed to connect to server');
    }
}