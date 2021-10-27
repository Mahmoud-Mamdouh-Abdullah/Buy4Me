"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_Router_1 = require("./Routes/User.Router");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var userRouter = new User_Router_1.UserRouter();
app.use(userRouter.getPath(), userRouter.getRouter());
app.listen(5000, function () {
    console.log("server running ...");
    console.log("server listen on port 5000");
});
