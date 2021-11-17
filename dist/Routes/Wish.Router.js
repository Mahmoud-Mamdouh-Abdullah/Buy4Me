"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishRouter = void 0;
var express_1 = __importDefault(require("express"));
var AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
var WishController_1 = require("../Controllers/WishController");
var WishRouter = /** @class */ (function () {
    function WishRouter() {
    }
    WishRouter.prototype.getPath = function () {
        return ('/wishlist');
    };
    WishRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.use(new AuthenticationMiddleware_1.AuthMiddleware().getMiddlware());
        router.get('/id/:id', WishController_1.getWishList);
        router.put('/id/:id', WishController_1.updateWishList);
        return router;
    };
    return WishRouter;
}());
exports.WishRouter = WishRouter;
