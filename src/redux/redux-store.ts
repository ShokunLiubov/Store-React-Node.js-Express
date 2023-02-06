import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
  Reducer,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./authReducer/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { ordersReducer } from "./ordersReducer/ordersReducer";
import { productReducer } from "./productReducer/productReducer";
import { customerReducer } from "./customerReducer/customerReducer";
import { basketReducer } from "./basketReducer/basketReducer";

interface IReducers {
  orders: any;
  product: any;
  customer: any;
  auth: any;
  basket: any;
}

const reducers: Reducer<IReducers> = combineReducers({
  orders: ordersReducer,
  product: productReducer,
  customer: customerReducer,
  auth: authReducer,
  basket: basketReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
