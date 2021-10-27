"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var AuthChecker_1 = require("./AuthChecker");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (email, password) {
        return (new AuthChecker_1.AuthChecker(email, password));
    };
    return AuthService;
}());
exports.AuthService = AuthService;
