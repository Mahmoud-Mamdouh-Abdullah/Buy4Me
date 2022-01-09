"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var AuthController_1 = require("../Controllers/AuthController");
var Users_Controller_1 = require("../Controllers/Users.Controller");
var MulterMiddleware_1 = require("../Middlewares/MulterMiddleware");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.prototype.getPath = function () {
        return '/users';
    };
    UserRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        var upload = (new MulterMiddleware_1.MulterMiddleware()).getMiddlware();
        router.use(upload.single('imgUrl'));
        router.get('/', Users_Controller_1.all);
        router.get('/id/:id', Users_Controller_1.getUserById);
        router.post('/', Users_Controller_1.createUser);
        router.post('/login', AuthController_1.login);
        router.put('/uploadImg/:id', Users_Controller_1.uploadUserImage);
        router.put('/update/:id', Users_Controller_1.updateUserData);
        return router;
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
