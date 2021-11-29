import { MyServer } from './Core/MyServer';
import { CartRouter } from './Routes/Cart.Router';
import { CategoryRouter } from './Routes/Category.Router';
import { OrderRouter } from './Routes/Order.Router';
import { ProductRouter } from './Routes/Product.Router';
import { UserRouter } from './Routes/User.Router';
import { WishRouter } from './Routes/Wish.Router';

/**
 * create the app server
 */
const app = new MyServer();

/**
 * add routers to the server
 */
app.addRouter(new UserRouter());
app.addRouter(new ProductRouter());
app.addRouter(new OrderRouter());
app.addRouter(new CartRouter());
app.addRouter(new CategoryRouter());
app.addRouter(new WishRouter());
/**
 * listen to the server
 */
//@ts-ignore
app.listen(process.env.PORT);