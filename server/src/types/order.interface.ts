import { Document, PaginateModel, Schema } from 'mongoose'
import { IPagination } from './pagination.interface'

export interface IOrderDocument extends Document {
	fullName: string
	status: string
	products: { count?: number; productId?: Schema.Types.ObjectId }[]
	createdAt: Date
	allPrice?: number
	address?: {
		city: string
		street: string
		postOffice: string
	}
}

export interface IOrderModel<T extends Document> extends PaginateModel<T> {}

export interface IOrderQueryFilters extends IPagination {
	search?: string
	status?: string
	city?: string
	price?: {
		$gte: number | string
		$lte: number | string
	}
	dataRange?: {
		from?: Date
		to?: Date
	}
}

export interface IOrderFilter {
	fullName?: RegExp
	status?: { $in: string[] }
	createdAt?: { $gte: Date; $lte: Date } | undefined
	allPrice?: { $gte: number | string; $lte: number | string }
	address?: {
		city?: { $in: string[] }
		street?: string
		postOffice?: string
	}
}
