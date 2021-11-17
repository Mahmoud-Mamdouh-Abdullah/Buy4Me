"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wish = void 0;
var mongoose_1 = require("mongoose");
var WishSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    products_list: [{
            _id: mongoose_1.Types.ObjectId
        }],
    created_at: String,
    updated_at: String
});
exports.Wish = (0, mongoose_1.model)('Wish', WishSchema);
