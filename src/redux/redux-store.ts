import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './authReducer/auth.reducer'
import { basketReducer } from './basketReducer/basket.reducer'
import { deliveryReducer } from './deliveryReducer/delivery.reducer'
import { orderReducer } from './orderReducer/order.reducer'
import { productReducer } from './productReducer/product.reducer'
import { statsReducer } from './statsReducer/stats.reducer'
import { storeReducer } from './storeReducer/store.reducer'
import { userReducer } from './userReducer/user.reducer'

const rootReducer = combineReducers({
	order: orderReducer,
	product: productReducer,
	user: userReducer,
	auth: authReducer,
	basket: basketReducer,
	store: storeReducer,
	delivery: deliveryReducer,
	stats: statsReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

export default store
