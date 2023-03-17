import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { authReducer } from "./authReducer/authReducer"
import { basketReducer } from "./basketReducer/basketReducer"
import { orderReducer } from "./orderReducer/orderReducer"
import { productReducer } from "./productReducer/productReducer"
import { productStoreReducer } from './productStoreReducer/productStoreReducer'
import { userReducer } from "./userReducer/userReducer"

const rootReducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  basket: basketReducer,
  productStore: productStoreReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
