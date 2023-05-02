import { IOrder } from '../interfaces/order.interface'
import { IPaginatorResponse } from './paginatorResponse.interface'

export interface IOrdersResponse extends IPaginatorResponse {
  docs: IOrder[]
}
