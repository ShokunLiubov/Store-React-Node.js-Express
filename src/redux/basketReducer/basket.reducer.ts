import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import * as actionType from './basket.action-type'
import * as I from './basket.interface'

interface IBasketState {
	productsBasket: IProductBasket[]
	basketSum: number
}

let initialState: IBasketState = {
	productsBasket: [],
	basketSum: 0,
}

export const basketReducer = (
	state = initialState,
	action:
		| I.IAddProduct
		| I.ICounterSumBasket
		| I.IDecrementCount
		| I.IIncrementCount
		| I.IRemoveFromBasket
		| I.ISetEmptyBasket,
): IBasketState => {
	switch (action.type) {
		case actionType.ADD_PRODUCT:
			if ('product' in action) {
				return {
					...state,
					productsBasket: [...state.productsBasket, action.product],
				}
			}
			break

		case actionType.REMOVE_PRODUCT:
			if ('productId' in action) {
				return {
					...state,
					productsBasket: state.productsBasket.filter(
						(product: IProductBasket) => product.id !== action.productId,
					),
				}
			}
			break

		case actionType.INCREMENT_COUNT_PRODUCT:
			if ('productId' in action) {
				state.productsBasket.map((product: IProductBasket): void => {
					if (product.id === action.productId) {
						product.count += 1
					}
				})
			}

			return {
				...state,
				productsBasket: [...state.productsBasket],
			}

		case actionType.DECREMENT_COUNT_PRODUCT:
			if ('productId' in action) {
				state.productsBasket.map((product: IProductBasket): void => {
					if (product.id === action.productId) {
						product.count -= 1
					}
				})
			}

			return {
				...state,
				productsBasket: [...state.productsBasket],
			}

		case actionType.COUNTER_SUM_IN_BASKET:
			let basketSum = 0
			state.productsBasket.map((product: IProductBasket): number => {
				return (basketSum = basketSum + product.price * product.count)
			})

			return {
				...state,
				basketSum: basketSum,
			}

		case actionType.SET_EMPTY_BASKET:
			return {
				...state,
				productsBasket: [],
				basketSum: 0,
			}

		default:
			break
	}
	return state
}
