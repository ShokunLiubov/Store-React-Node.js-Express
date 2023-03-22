import dateRange from './dateRange'

class orderFilters {

    async orderFilters(query) {

        try {
            const { search, dataRange, status, price, city } = query
            const filters = {}

            if (search) {
                filters.fullName = new RegExp(`${search}`, "i")
            }

            if (status) {
                const statusSelect = status.split(',')
                filters.status = { $in: statusSelect }
            }

            if (city) {
                const citySelect = city.split(',')
                filters["address.city"] = { $in: citySelect }
            }

            if (dataRange) {
                let { from, to } = dataRange
                filters.createdAt = await dateRange.dataRangePicker(from, to)
            }

            if (price) {
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
