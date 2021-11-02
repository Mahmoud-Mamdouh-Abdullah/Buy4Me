"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
var express_1 = __importDefault(require("express"));
var AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
var OrdersController_1 = require("../Controllers/OrdersController");
var OrderRouter = /** @class */ (function () {
    function OrderRouter() {
    }
    OrderRouter.prototype.getPath = function () {
        return '/orders';
    };
    OrderRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.use(new AuthenticationMiddleware_1.AuthMiddleware().getMiddlware());
        router.get('/', OrdersController_1.all);
        router.post('/', OrdersController_1.createOrder);
        router.get('/:id', OrdersController_1.getByOrderId);
        router.put('/:id', OrdersController_1.updateOrder);
        router.delete('/:id', OrdersController_1.deleteOrder);
        router.get('/users/:user_id', OrdersController_1.getOrdersByUserId);
        return router;
    };
    return OrderRouter;
}());
exports.OrderRouter = OrderRouter;
