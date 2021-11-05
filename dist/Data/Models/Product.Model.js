"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    images: [{
            url: String
        }],
    user_id: mongoose_1.Types.ObjectId,
    created_at: String,
    updated_at: String
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
