"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UsersService = void 0;
var Encryptor_1 = require("./Encryptor");
var Cart_Model_1 = require("../Data/Models/Cart.Model");
var CartRepository_1 = require("../Data/Repositories/CartRepository");
var WishRepository_1 = require("../Data/Repositories/WishRepository");
var UsersRepository_1 = require("../Data/Repositories/UsersRepository");
var Wish_Model_1 = require("../Data/Models/Wish.Model");
var fs_1 = __importDefault(require("fs"));
var userRepo = new UsersRepository_1.UsersRepository();
var cartRepository = new CartRepository_1.CartRepository();
var wishRepository = new WishRepository_1.WishRepository();
var UsersService = /** @class */ (function () {
    function UsersService() {
        var _this = this;
        this.ifEmailExist = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepo.selectOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        }); };
    }
    UsersService.prototype.findAll = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepo.find(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptor, newUser, cart, wishList, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ifEmailExist(user.email)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        encryptor = new Encryptor_1.Encryptor(user.password);
                        user.password = encryptor.encrypt();
                        user.created_at = new Date().toISOString();
                        user.updated_at = new Date().toISOString();
                        return [4 /*yield*/, userRepo.insert(user)];
                    case 3:
                        newUser = _a.sent();
                        return [4 /*yield*/, this.addNewCart(newUser._id)];
                    case 4:
                        cart = _a.sent();
                        return [4 /*yield*/, this.addNewWishList(newUser._id)];
                    case 5:
                        wishList = _a.sent();
                        return [2 /*return*/, {
                                user: newUser,
                                cart: cart,
                                wishList: wishList
                            }];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, {
                                error: e_1.message
                            }];
                    case 7: return [2 /*return*/, {
                            error: 'This email already exist !!'
                        }];
                }
            });
        });
    };
    UsersService.prototype.addNewCart = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cart = new Cart_Model_1.Cart({
                            _id: _id,
                            products_list: [],
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        });
                        return [4 /*yield*/, cartRepository.insert(cart)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.addNewWishList = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var wishList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wishList = new Wish_Model_1.Wish({
                            _id: _id,
                            products_list: [],
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        });
                        return [4 /*yield*/, wishRepository.insert(wishList)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.findById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, cart, wishList, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userRepo.selectOne({ _id: _id })];
                    case 1:
                        user = (_a.sent());
                        return [4 /*yield*/, this.getCartByUserId(_id)];
                    case 2:
                        cart = _a.sent();
                        return [4 /*yield*/, this.getWishListByUserId(_id)];
                    case 3:
                        wishList = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                cart: cart,
                                wishList: wishList
                            }];
                    case 4:
                        e_2 = _a.sent();
                        return [2 /*return*/, {
                                error: e_2.message
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.getCartByUserId = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cartRepository.selectOne({ _id: _id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.getWishListByUserId = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wishRepository.selectOne({ _id: _id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.ifUserExist = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepo.selectOne({ _id: _id })];
                    case 1:
                        user = _a.sent();
                        if (user === null || user.error)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UsersService.prototype.uploadImage = function (_id, path) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepo.updateOne(_id, { imgUrl: path })];
                    case 1:
                        user = (_a.sent());
                        if (user.imgUrl !== null) {
                            fs_1.default.unlinkSync(user.imgUrl);
                        }
                        return [4 /*yield*/, userRepo.selectOne({ _id: _id })];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    UsersService.prototype.updateData = function (_id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepo.updateOne(_id, __assign(__assign({}, data), { updated_at: new Date().toISOString() }))];
                    case 1:
                        (_a.sent());
                        return [4 /*yield*/, userRepo.selectOne({ _id: _id })];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    return UsersService;
}());
exports.UsersService = UsersService;
