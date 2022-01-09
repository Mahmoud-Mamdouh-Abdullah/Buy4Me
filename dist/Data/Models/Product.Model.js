"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var ProductSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    brandName: String,
    images: [{
            url: String
        }],
    user_id: mongoose_1.Types.ObjectId,
    created_at: String,
    updated_at: String
});
ProductSchema.plugin(mongoose_paginate_v2_1.default);
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
