"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryptor = void 0;
var crypto_1 = require("crypto");
var Encryptor = /** @class */ (function () {
    function Encryptor(password) {
        this.plainPassword = password;
    }
    Encryptor.prototype.encrypt = function () {
        return (0, crypto_1.createHmac)("sha256", "mah10mou11ddo7ha2mam19dou97hshe19ri98f")
            .update(this.plainPassword).digest("base64");
    };
    return Encryptor;
}());
exports.Encryptor = Encryptor;
