import { Request } from 'express'

import { Document, PaginateModel, Schema } from 'mongoose'
import { IPagination } from './pagination.interface'

export interface IProductsDocument extends Document {
	id: string
	image: string
	title: string
	category: Schema.Types.ObjectId
	classification: Schema.Types.ObjectId
	price: number
	count: number
	gender: string
	volume: string
	type_of_aroma: string
	country_of_TM: string
	made_in: string
	description: string
	createdAt: Date
}

export interface IProductsModel<T extends Document> extends PaginateModel<T> {}

export interface IReqWithImg extends Request {
	file?: any
}

export interface IProductQueryFilters extends IPagination {
	search?: string
	category?: string
	classification?: string
	type_of_aroma?: string
	made_in?: string
	country_of_TM?: string
	gender?: string
	price?: {
		$gte: number | string
		$lte: number | string
	}
	count?: {
		$gte: number | string
		$lte: number | string
	}

	volume?: {
		$gte: number | string
		$lte: number | string
	}
}

export interface IProductFilter {
	title?: RegExp
	category?: { $in: string[] }
	classification?: { $in: string[] }
	gender?: { $in: string[] }
	type_of_aroma?: { $in: string[] }
	made_in?: { $in: string[] }
	country_of_TM?: { $in: string[] }
	price?: { $gte: number | string; $lte: number | string }
	count?: { $gte: number | string; $lte: number | string }
	volume?: { $gte: number | string; $lte: number | string }
}
