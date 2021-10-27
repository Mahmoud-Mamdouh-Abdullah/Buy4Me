"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var AuthController_1 = require("../Controllers/AuthController");
var User_Controller_1 = require("../Controllers/User.Controller");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.prototype.getPath = function () {
        return '/users';
    };
    UserRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.get('/', User_Controller_1.all);
        router.get('/:id', User_Controller_1.getById);
        router.post('/', User_Controller_1.createUser);
        router.post('/login', AuthController_1.login);
        return router;
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
