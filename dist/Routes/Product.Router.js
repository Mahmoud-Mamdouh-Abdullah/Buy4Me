"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
var express_1 = __importDefault(require("express"));
var MulterMiddleware_1 = require("../Middlewares/MulterMiddleware");
var ProductsController_1 = require("../Controllers/ProductsController");
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
        router.get('/', ProductsController_1.all);
        router.get('/search/:query', ProductsController_1.getByQuery);
        router.get('/category/:category', ProductsController_1.getProductsByCategory);
        router.post('/', ProductsController_1.createProduct);
        router.delete('/id/:id', ProductsController_1.deleteProduct);
        router.put('/id/:id', ProductsController_1.updateProduct);
        return router;
    };
    return ProductRouter;
}());
exports.ProductRouter = ProductRouter;
