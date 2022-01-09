"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    created_at: String,
    updated_at: String,
    imgUrl: String
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
