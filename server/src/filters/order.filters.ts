import { IOrderFilter, IOrderQueryFilters } from '../types/order.interface'
import dateRange from './dateRange'

class orderFilters {
	async orderFilters(query: IOrderQueryFilters) {
		try {
			const { search, dataRange, status, price, city } = query
			const filters: IOrderFilter = {}

			if (search) {
				filters.fullName = new RegExp(`${search}`, 'i')
			}

			if (status) {
				const statusSelect = status.split(',')
				filters.status = { $in: statusSelect }
			}

			if (city) {
				const citySelect = city.split(',')
				if (!filters.address) {
					filters.address = { city: { $in: citySelect } }
				} else {
					filters.address.city = { $in: citySelect }
				}
			}

			if (dataRange && dataRange.from && dataRange.to) {
				let { from, to } = dataRange
				filters.createdAt = await dateRange.dataRangePicker(from, to)
			}

			if (price && price.$gte && price.$lte) {
				const { $gte, $lte } = price
				filters.allPrice = { $gte, $lte }
			}

			return filters
		} catch (e) {
			console.log(e)
		}
	}
}

export default new orderFilters()
