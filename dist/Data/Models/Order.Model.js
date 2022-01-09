"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = require("mongoose");
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var OrderSchema = new mongoose_1.Schema({
    products_list: [{
            _id: mongoose_1.Schema.Types.ObjectId,
            qty: Number
        }],
    user_id: mongoose_1.Schema.Types.ObjectId,
    location: String,
    amount: Number,
    created_at: String,
    updated_at: String
});
OrderSchema.plugin(mongoose_paginate_v2_1.default);
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
