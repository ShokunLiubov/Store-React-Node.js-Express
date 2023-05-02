import { IProduct } from '../interfaces/productInterface/product.interface'
import { IPaginatorResponse } from './paginatorResponse.interface'

export interface IProductResponse extends IPaginatorResponse {
  docs: IProduct[]
}
