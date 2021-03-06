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
exports.getUserById = exports.all = exports.updateUserData = exports.uploadUserImage = exports.createUser = void 0;
var User_Model_1 = require("../Data/Models/User.Model");
var UsersService_1 = require("../Services/UsersService");
var usersService = new UsersService_1.UsersService();
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, address, user, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, address = _a.address;
                if (!name || !email || !password || !address) {
                    return [2 /*return*/, res.send({ message: "some data is missing" })];
                }
                user = new User_Model_1.User({ name: name, email: email, password: password, address: address, imgUrl: null });
                return [4 /*yield*/, usersService.create(user)];
            case 1:
                result = _b.sent();
                if (result.error) {
                    return [2 /*return*/, res.send({ error: result.error })];
                }
                res.send(result);
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var uploadUserImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, path, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                if (!path) {
                    return [2 /*return*/, res.send({ error: 'Invalid or missing data !!' })];
                }
                return [4 /*yield*/, usersService.uploadImage(id, path)];
            case 1:
                result = (_b.sent());
                res.send(result);
                return [2 /*return*/];
        }
    });
}); };
exports.uploadUserImage = uploadUserImage;
var updateUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                data = req.body;
                if (!data.name || !data.email || !data.address) {
                    res.send({ error: 'Invalid or missing data !!' });
                }
                _b = (_a = res).send;
                return [4 /*yield*/, usersService.updateData(id, data)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUserData = updateUserData;
var all = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService.findAll()];
            case 1:
                users = _a.sent();
                res.send({ users: users });
                return [2 /*return*/];
        }
    });
}); };
exports.all = all;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, usersService.findById(id)];
            case 1:
                user = _a.sent();
                if (user === null || user.error) {
                    return [2 /*return*/, res.send({ message: "ID '" + id + "' is invalid" })];
                }
                res.send(user);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
