import { IProduct } from './product.interface'

export interface IProductOptions extends Partial<IProduct> {
    count?: number
}