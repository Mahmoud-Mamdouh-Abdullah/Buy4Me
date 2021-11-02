import { MyServer } from './Core/MyServer';
import { OrderRouter } from './Routes/Order.Router';
import { ProductRouter } from './Routes/Product.Router';
import { UserRouter } from './Routes/User.Router';

const app = new MyServer();
/**
 * add routers
 */
app.addRouter(new UserRouter());
app.addRouter(new ProductRouter());
app.addRouter(new OrderRouter());
app.listen(5000);