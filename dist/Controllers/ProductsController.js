"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getByQuery = exports.all = exports.createProduct = void 0;
var ProductsService_1 = require("../Services/ProductsService");
var UsersService_1 = require("../Services/UsersService");
var Product_Model_1 = require("../Data/Models/Product.Model");
var productsService = new ProductsService_1.ProductsService();
var userService = new UsersService_1.UsersService();
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var images, imagesUrls, _a, title, description, price, category, user_id, _b, product, savingRes;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                images = req.files;
                imagesUrls = images === null || images === void 0 ? void 0 : images.map(function (image) { return ({ url: image.path }); });
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, category = _a.category, user_id = _a.user_id;
                _b = !title
                    || !description
                    || !price
                    || !category
                    || !user_id
                    || imagesUrls.length === 0;
                if (_b) return [3 /*break*/, 2];
                return [4 /*yield*/, userService.ifUserExist(user_id)];
            case 1:
                _b = !(_c.sent());
                _c.label = 2;
            case 2:
                if (_b) {
                    return [2 /*return*/, res.status(406).send({ error: 'invalid or missing data' })];
                }
                if (imagesUrls.length > 4) {
                    return [2 /*return*/, res.status(406).send({ error: "The Max Allowed Images to Upload is 4" })];
                }
                product = new Product_Model_1.Product({
                    title: title,
                    description: description,
                    price: price,
                    category: category,
                    images: imagesUrls,
                    user_id: user_id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });
                return [4 /*yield*/, productsService.addProduct(product)];
            case 3:
                savingRes = _c.sent();
                if (!savingRes) {
                    return [2 /*return*/, res.status(500).send({ message: 'Internal Server Error' })];
                }
                res.send(savingRes);
                return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var all = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productsService.getAll()];
            case 1:
                products = _a.sent();
                if (products.error) {
                    return [2 /*return*/, res.status(501).send({ message: 'Internal Server Error' })];
                }
                res.send({ products: products, user: req.body.user });
                return [2 /*return*/];
        }
    });
}); };
exports.all = all;
var getByQuery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.params.query;
                return [4 /*yield*/, productsService.searchProducts(query)];
            case 1:
                products = _a.sent();
                if (products.error) {
                    res.status(501).send('Internal server error, try again later');
                }
                res.send({ products: products, user: req.body.user });
                return [2 /*return*/];
        }
    });
}); };
exports.getByQuery = getByQuery;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleteResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(406).send({ error: 'Invalid or missing data' })];
                }
                return [4 /*yield*/, productsService.deleteProductById(id)];
            case 1:
                deleteResult = _a.sent();
                if (deleteResult.error) {
                    return [2 /*return*/, res.status(501).send('Internal server error, try again later')];
                }
                if (deleteResult.deletedCount === 0) {
                    return [2 /*return*/, res.status(404).send({ error: "Product with id : " + id + " Not Found" })];
                }
                res.send({ message: "Product with id : " + id + " was deleted" });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, productsService.editProduct(id, req.body, req.files)];
            case 1:
                updateResult = _a.sent();
                if (updateResult === null) {
                    return [2 /*return*/, res.status(404).send({ error: "No Such this ID : '" + id + "'" })];
                }
                if (updateResult.error) {
                    return [2 /*return*/, res.status(404).send(updateResult)];
                }
                res.send(updateResult);
                return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
