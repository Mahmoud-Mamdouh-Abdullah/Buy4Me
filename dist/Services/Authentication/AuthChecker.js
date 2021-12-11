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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
var Encryptor_1 = require("../Encryptor");
var TokenServiec_1 = require("./TokenServiec");
var Token_Model_1 = require("../../Data/Models/Token.Model");
var UsersRepository_1 = require("../../Data/Repositories/UsersRepository");
var userRepo = new UsersRepository_1.UsersRepository();
var tokenService = new TokenServiec_1.TokenService();
var AuthChecker = /** @class */ (function () {
    function AuthChecker(email, password) {
        this.email = email;
        this.password = password;
    }
    AuthChecker.prototype.checkLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, encryptedPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, userRepo.selectOne({ email: this.email })];
                    case 1:
                        _a.user = _b.sent();
                        encryptedPassword = new Encryptor_1.Encryptor(this.password).encrypt();
                        if (this.user.error) {
                            return [2 /*return*/, false];
                        }
                        if (this.user.password !== encryptedPassword) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthChecker.prototype.generateToken = function () {
        return new Encryptor_1.Encryptor(JSON.stringify(__assign(__assign({}, this.user), { date: new Date() }))).encrypt();
    };
    AuthChecker.prototype.saveTokenAndGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, userToken, tokenObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.generateToken();
                        return [4 /*yield*/, tokenService.findToken({ user_id: this.user._id })];
                    case 1:
                        userToken = _a.sent();
                        if (!userToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, tokenService.delete(userToken._id.toString())];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        tokenObject = new Token_Model_1.Token({
                            token: token,
                            user_id: this.user._id,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        });
                        tokenService.create(tokenObject);
                        return [2 /*return*/, {
                                user: this.user,
                                token: token
                            }];
                }
            });
        });
    };
    return AuthChecker;
}());
exports.AuthChecker = AuthChecker;
