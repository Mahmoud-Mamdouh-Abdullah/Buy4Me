"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.prototype.getPath = function () {
        return '/users';
    };
    UserRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.get('/');
        router.get('/:id');
        return router;
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
