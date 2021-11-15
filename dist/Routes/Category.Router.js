"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
var express_1 = __importDefault(require("express"));
var CategoryController_1 = require("../Controllers/CategoryController");
var CategoryRouter = /** @class */ (function () {
    function CategoryRouter() {
    }
    CategoryRouter.prototype.getPath = function () {
        return ('/categories');
    };
    CategoryRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.post('/', CategoryController_1.createCategory);
        router.get('/', CategoryController_1.all);
        return router;
    };
    return CategoryRouter;
}());
exports.CategoryRouter = CategoryRouter;
