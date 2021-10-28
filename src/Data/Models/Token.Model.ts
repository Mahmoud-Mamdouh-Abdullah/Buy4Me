import { Schema, mongo, model } from "mongoose";

const TokenSchema = new Schema({
    token: String,
    user_id: Schema.Types.ObjectId,
    created_at: String,
    updated_at: String
})

export const Token: any = model('Token', TokenSchema);