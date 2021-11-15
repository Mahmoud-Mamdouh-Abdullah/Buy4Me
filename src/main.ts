import { MyServer } from './Core/MyServer';
import { CartRouter } from './Routes/Cart.Router';
import { OrderRouter } from './Routes/Order.Router';
import { ProductRouter } from './Routes/Product.Router';
import { UserRouter } from './Routes/User.Router';


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
/**
 * listen to the server
 */
app.listen(5000);