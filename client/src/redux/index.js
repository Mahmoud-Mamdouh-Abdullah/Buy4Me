import { createStore } from 'redux';
import reducers from './reducers';
import middlware from './middlewares';


const store = createStore(reducers, middlware);

export default store;