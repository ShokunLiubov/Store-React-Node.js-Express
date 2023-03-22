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
import { userReducer } from "./userReducer/userReducer"

const rootReducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  basket: basketReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
