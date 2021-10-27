import express from 'express';
import { UserRouter } from './Routes/User.Router';

const app = express();

app.use(express.json());

const userRouter = new UserRouter();
app.use(userRouter.getPath(), userRouter.getRouter());

app.listen(5000, () => {
    console.log(`server running ...`);
    console.log(`server listen on port 5000`);
});