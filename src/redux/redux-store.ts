import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { authReducer } from "./authReducer/authReducer"
import { basketReducer } from "./basketReducer/basketReducer"
import { deliveryReducer } from './deliveryReducer/deliveryReducer'
import { orderReducer } from "./orderReducer/orderReducer"
import { productReducer } from "./productReducer/productReducer"
import { statsReducer } from './statsReducer/statsReducer'
import { storeReducer } from './storeReducer/storeReducer'
import { userReducer } from "./userReducer/userReducer"

const rootReducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  basket: basketReducer,
  store: storeReducer,
  delivery: deliveryReducer,
  stats: statsReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
