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
exports.getByQuery = exports.all = exports.createProduct = void 0;
var ProductsService_1 = require("../Services/ProductsService");
var Product_Model_1 = require("../Data/Models/Product.Model");
var productsService = new ProductsService_1.ProductsService();
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var images, imagesUrls, _a, title, description, price, category, product, savingRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                images = req.files;
                imagesUrls = images === null || images === void 0 ? void 0 : images.map(function (image) { return ({ url: image.path }); });
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, category = _a.category;
                if (!title || !description || !price || !category || imagesUrls.length === 0) {
                    return [2 /*return*/, res.status(400).send({ message: 'invalid or missing data' })];
                }
                product = new Product_Model_1.Product({
                    title: title,
                    description: description,
                    price: price,
                    category: category,
                    images: imagesUrls,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });
                return [4 /*yield*/, productsService.create(product)];
            case 1:
                savingRes = _b.sent();
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
            case 0: return [4 /*yield*/, productsService.find()];
            case 1:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(500).send({ message: 'Internal Server Error' })];
                }
                res.send({ products: products, user: req.body.user });
                return [2 /*return*/];
        }
    });
}); };
exports.all = all;
var getByQuery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, filter, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.params.query;
                filter = {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                        { category: { $regex: query, $options: 'i' } },
                    ]
                };
                return [4 /*yield*/, productsService.find(filter)];
            case 1:
                products = _a.sent();
                if (!products) {
                    res.status(500).send('Internal server error, try again later');
                }
                res.send({ products: products, user: req.body.user });
                return [2 /*return*/];
        }
    });
}); };
exports.getByQuery = getByQuery;
