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
import { orderReducer } from "./orderReducer/orderReducer";
import { productReducer } from "./productReducer/productReducer";
import { userReducer } from "./userReducer/userReducer";
import { basketReducer } from "./basketReducer/basketReducer";

interface IReducers {
  order: any;
  product: any;
  user: any;
  auth: any;
  basket: any;
}

const reducers: Reducer<IReducers> = combineReducers({
  order: orderReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  basket: basketReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
