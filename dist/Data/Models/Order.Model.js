"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = require("mongoose");
var OrderSchema = new mongoose_1.Schema({
    products_list: [{
            _id: mongoose_1.Schema.Types.ObjectId
        }],
    user_id: mongoose_1.Schema.Types.ObjectId,
    location: String,
    amount: Number,
    created_at: String,
    updated_at: String
});
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
