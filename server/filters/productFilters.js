
class productFilters {

    async productFilters(query) {

        try {
            const { search, category, count, price } = query
            const filters = {}

            if (search) {
                filters.title = new RegExp(`${search}`, "i")
            }

            if (category) {
                const categories = category.split(',')
                filters.category = { $in: categories }
            }

            if (count) {
                const { $gte, $lte } = count

                filters.count = { $gte, $lte }
            }

            if (price) {
                const { $gte, $lte } = price
                filters.price = { $gte, $lte }
            }

            return filters
        } catch (e) {
            console.log(e)
        }
    }

}

export default new productFilters()
