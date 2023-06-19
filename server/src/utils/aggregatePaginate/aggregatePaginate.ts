import { Model } from 'mongoose'

interface IAggregatePaginate {
	page: number | string
	limit: number | string
	Collection: Model<any>
	aggregateBody: any
	sortField: string
	sortOrder: string | number
}

class aggregatePaginate {
	async aggregatePaginate({
		page,
		limit,
		Collection,
		aggregateBody,
		sortField,
		sortOrder,
	}: IAggregatePaginate) {
		try {
			page = +page
			limit = +limit
			sortOrder = +sortOrder

			const count = await Collection.aggregate([
				...aggregateBody,
				{ $count: 'count' },
			])

			const docs = await Collection.aggregate([
				...aggregateBody,
				{
					$sort: { [sortField]: sortOrder },
				},
				{
					$skip: (page - 1) * limit,
				},
				{
					$limit: limit,
				},
			])

			const totalDocs = count[0]?.count ?? 0
			const totalPages = Math.ceil(totalDocs / limit)

			return {
				docs: docs || [],
				currentPage: page,
				totalPages,
			}
		} catch (e) {
			console.log(e)
			return {
				docs: [],
				page: 0,
				totalPages: 0,
			}
		}
	}
}
export default new aggregatePaginate()
