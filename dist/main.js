"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyServer_1 = require("./Core/MyServer");
var Cart_Router_1 = require("./Routes/Cart.Router");
var Category_Router_1 = require("./Routes/Category.Router");
var Order_Router_1 = require("./Routes/Order.Router");
var Product_Router_1 = require("./Routes/Product.Router");
var User_Router_1 = require("./Routes/User.Router");
var Wish_Router_1 = require("./Routes/Wish.Router");
/**
 * create the app server
 */
var app = new MyServer_1.MyServer();
/**
 * add routers to the server
 */
app.addRouter(new User_Router_1.UserRouter());
app.addRouter(new Product_Router_1.ProductRouter());
app.addRouter(new Order_Router_1.OrderRouter());
app.addRouter(new Cart_Router_1.CartRouter());
app.addRouter(new Category_Router_1.CategoryRouter());
app.addRouter(new Wish_Router_1.WishRouter());
/**
 * listen to the server
 */
//@ts-ignore
app.listen(process.env.PORT);
