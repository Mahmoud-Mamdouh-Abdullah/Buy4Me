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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
var ProductsRepository_1 = require("../Data/Repositories/ProductsRepository");
var fs_1 = __importDefault(require("fs"));
var productsRepository = new ProductsRepository_1.ProductsRepository();
var ProductsService = /** @class */ (function () {
    function ProductsService() {
    }
    ProductsService.prototype.addProduct = function (productObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsRepository.insert(productObject)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsRepository.selectAll()];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.getPodcutsByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsRepository.selectAll({ category: category })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.getProductById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsRepository.selectOne({ _id: _id })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.searchProducts = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = {
                            $or: [
                                { title: { $regex: query, $options: 'i' } },
                                { description: { $regex: query, $options: 'i' } },
                                { category: { $regex: query, $options: 'i' } },
                            ]
                        };
                        return [4 /*yield*/, productsRepository.selectAll(filter)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.deleteProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedProduct, imgUrls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsRepository.deleteOne({ _id: id })];
                    case 1:
                        deletedProduct = _a.sent();
                        if (deletedProduct !== null && deletedProduct['error'] === undefined) {
                            imgUrls = deletedProduct.images.map(function (img) { return img.url; });
                            imgUrls.forEach(function (url) {
                                fs_1.default.unlinkSync(url);
                            });
                        }
                        return [2 /*return*/, {
                                deletedId: (deletedProduct._id).toString()
                            }];
                }
            });
        });
    };
    ProductsService.prototype.editProduct = function (id, reqBody, reqFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var body, oldProduct, imgUrls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = this.validteUpdateReques(reqBody, reqFiles);
                        if (body.error) {
                            return [2 /*return*/, body];
                        }
                        return [4 /*yield*/, productsRepository.selectOneAndUpdate(id, body)];
                    case 1:
                        oldProduct = (_a.sent());
                        if (oldProduct !== null && oldProduct['error'] === undefined) {
                            imgUrls = oldProduct.images.map(function (img) { return img.url; });
                            imgUrls.forEach(function (url) {
                                fs_1.default.unlinkSync(url);
                            });
                        }
                        return [4 /*yield*/, productsRepository.selectOne({ _id: oldProduct._id })];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ProductsService.prototype.validteUpdateReques = function (reqBody, reqFiles) {
        var body = {};
        var title = reqBody.title, description = reqBody.description, price = reqBody.price, category = reqBody.category;
        if (title) {
            body['title'] = title;
        }
        if (description) {
            body['description'] = description;
        }
        if (price) {
            body['price'] = price;
        }
        if (category) {
            body['category'] = category;
        }
        if (reqFiles && reqFiles.length > 0) {
            var images = reqFiles;
            var imagesUrls = images === null || images === void 0 ? void 0 : images.map(function (image) { return ({ url: image.path }); });
            body['images'] = imagesUrls;
        }
        if (Object.keys(body).length === 0) {
            return { error: 'Missing Data !!' };
        }
        return body;
    };
    return ProductsService;
}());
exports.ProductsService = ProductsService;
