import { IRangeDate } from '../stats/rangeDate.interface'
import { IPaginatorResponse } from './paginatorResponse.interface'

export interface IProfitResponse extends IPaginatorResponse {
  date: IRangeDate
  profit: {
    _id: null
    totalProfit: number
  }
  
}
