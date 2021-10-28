"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterMiddleware = void 0;
var multer_1 = __importDefault(require("multer"));
var MulterMiddleware = /** @class */ (function () {
    function MulterMiddleware() {
    }
    MulterMiddleware.prototype.getMiddlware = function () {
        var fileStorageEngine = multer_1.default.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './images');
            },
            filename: function (req, file, callback) {
                callback(null, Date.now() + '--' + file.originalname);
            }
        });
        var upload = (0, multer_1.default)({ storage: fileStorageEngine });
        return upload;
    };
    return MulterMiddleware;
}());
exports.MulterMiddleware = MulterMiddleware;
