import { MyServer } from './Core/MyServer';
import { ProductRouter } from './Routes/Product.Router';
import { UserRouter } from './Routes/User.Router';

const app = new MyServer();
/**
 * add routers
 */
app.addRouter(new UserRouter());
app.addRouter(new ProductRouter());
app.listen(5000);