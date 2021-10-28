"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var mongoose_1 = require("mongoose");
var TokenSchema = new mongoose_1.Schema({
    token: String,
    user_id: mongoose_1.Schema.Types.ObjectId,
    created_at: String,
    updated_at: String
});
exports.Token = (0, mongoose_1.model)('Token', TokenSchema);
