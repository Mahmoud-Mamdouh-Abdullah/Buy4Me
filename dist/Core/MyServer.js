"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyServer = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var MyServer = /** @class */ (function () {
    function MyServer() {
        this._server = (0, express_1.default)();
        this._server.use(express_1.default.json());
        this._server.use((0, cors_1.default)());
        this._server.use('/images', express_1.default.static('images'));
        this._server.get('/', function (req, res) {
            res.send({ messages: 'this is the E-Commerce Server Endpoint' });
        });
    }
    MyServer.prototype.addRouter = function (router) {
        this._server.use(router.getPath(), router.getRouter());
    };
    MyServer.prototype.addMiddleware = function (middlware) {
        this._server.use(middlware.getMiddlware());
    };
    MyServer.prototype.listen = function (port) {
        this._server.listen(port, function () {
            console.log("server running ...");
            console.log("server listen on port 5000");
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
