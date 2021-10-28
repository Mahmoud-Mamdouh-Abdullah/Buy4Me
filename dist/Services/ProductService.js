"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var ProductRepository_1 = require("../Data/Repositories/ProductRepository");
var productsRepository = new ProductRepository_1.ProductRepository();
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    return ProductService;
}());
exports.ProductService = ProductService;
