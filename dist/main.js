"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyServer_1 = require("./Core/MyServer");
var Product_Router_1 = require("./Routes/Product.Router");
var User_Router_1 = require("./Routes/User.Router");
var app = new MyServer_1.MyServer();
/**
 * add routers
 */
app.addRouter(new User_Router_1.UserRouter());
app.addRouter(new Product_Router_1.ProductRouter());
app.listen(5000);
