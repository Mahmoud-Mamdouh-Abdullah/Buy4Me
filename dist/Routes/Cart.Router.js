"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
var express_1 = __importDefault(require("express"));
var CartController_1 = require("../Controllers/CartController");
var AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
var CartRouter = /** @class */ (function () {
    function CartRouter() {
    }
    CartRouter.prototype.getPath = function () {
        return ('/cart');
    };
    CartRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.use(new AuthenticationMiddleware_1.AuthMiddleware().getMiddlware());
        router.get('/id/:id', CartController_1.getCart);
        router.put('/id/:id', CartController_1.updateCart);
        return router;
    };
    return CartRouter;
}());
exports.CartRouter = CartRouter;
