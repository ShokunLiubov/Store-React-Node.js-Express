import { authReducer } from "./authReducer/authReducer";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
  Reducer,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ordersReducer } from "./ordersReducer/ordersReducer";
import { productReducer } from "./productReducer/productReducer";
import { customerReducer } from "./customerReducer/customerReducer";

interface IReducers {
  orders: any;
  product: any;
  customer: any;
  auth: any;
}

const reducers: Reducer<IReducers> = combineReducers({
  orders: ordersReducer,
  product: productReducer,
  customer: customerReducer,
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;
