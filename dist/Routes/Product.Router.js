"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
var express_1 = __importDefault(require("express"));
var MulterMiddleware_1 = require("../Middlewares/MulterMiddleware");
var ProductsController_1 = require("../Controllers/ProductsController");
var AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
var ProductRouter = /** @class */ (function () {
    function ProductRouter() {
    }
    ProductRouter.prototype.getPath = function () {
        return '/products';
    };
    ProductRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        var upload = (new MulterMiddleware_1.MulterMiddleware()).getMiddlware();
        router.use(upload.array('images', 4));
        router.use(new AuthenticationMiddleware_1.AuthMiddleware().getMiddlware());
        router.get('/', ProductsController_1.all);
        router.get('/:query', ProductsController_1.getByQuery);
        router.post('/', ProductsController_1.createProduct);
        return router;
    };
    return ProductRouter;
}());
exports.ProductRouter = ProductRouter;
