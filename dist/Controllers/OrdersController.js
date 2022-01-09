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
exports.deleteOrder = exports.updateOrder = exports.getByOrderId = exports.getOrdersByUserId = exports.all = exports.createOrder = void 0;
var Order_Model_1 = require("../Data/Models/Order.Model");
var OrdersService_1 = require("../Services/OrdersService");
var ordersService = new OrdersService_1.OrdersService();
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, products_list, location, amount, user_id, orderObject, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, products_list = _a.products_list, location = _a.location, amount = _a.amount, user_id = _a.user_id;
                if (!products_list || !location || !amount || !user_id || products_list.length === 0) {
                    return [2 /*return*/, res.send({ error: 'Invalid or missing data' })];
                }
                orderObject = new Order_Model_1.Order({
                    products_list: products_list,
                    location: location,
                    amount: amount,
                    user_id: user_id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });
                return [4 /*yield*/, ordersService.addOrder(orderObject)];
            case 1:
                result = _b.sent();
                if (result.error) {
                    return [2 /*return*/, res.send(result)];
                }
                res.send({ msg: "A new order is placed with ID : " + result._id });
                return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var all = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = req.query.page;
                return [4 /*yield*/, ordersService.getAll(page)];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); };
exports.all = all;
var getOrdersByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, userId, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = req.query.page;
                userId = req.params.user_id;
                return [4 /*yield*/, ordersService.getOrdersByUserID(userId, page)];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); };
exports.getOrdersByUserId = getOrdersByUserId;
var getByOrderId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, ordersService.getOrderByID(id)];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    res.send({ msg: 'Invalid or missing data' });
                }
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); };
exports.getByOrderId = getByOrderId;
var updateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, orderBody, updatingResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                orderBody = req.body.product;
                if (!orderBody || !id) {
                    return [2 /*return*/, res.status(406).send({ error: 'Invalid or missing data!' })];
                }
                orderBody.updated_at = new Date().toISOString();
                return [4 /*yield*/, ordersService.editOrder(id, orderBody)];
            case 1:
                updatingResult = _a.sent();
                if (updatingResult.error) {
                    return [2 /*return*/, res.status(501).send({ error: 'Internal Server Error' })];
                }
                res.send(updatingResult);
                return [2 /*return*/];
        }
    });
}); };
exports.updateOrder = updateOrder;
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, ordersService.removeOrder(id)];
            case 1:
                result = _a.sent();
                if (result.error) {
                    res.send({ msg: 'Invalid or missing data' });
                }
                if (result.deletedCount === 0) {
                    res.send({ msg: 'No Such this ID' });
                }
                res.send({ msg: 'Order Deleted Successfully' });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteOrder = deleteOrder;
