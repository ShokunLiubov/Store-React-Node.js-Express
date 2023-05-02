import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'

export interface IAddProduct {
    type: string
	product: IProductBasket
}

export interface IRemoveFromBasket {
    type: string
    productId: string
}

export interface IIncrementCount {
    type: string
    productId: string
}

export interface IDecrementCount {
    type: string
    productId: string
}

export interface ICounterSumBasket {
    type: string
}

export interface ISetEmptyBasket {
    type: string
}