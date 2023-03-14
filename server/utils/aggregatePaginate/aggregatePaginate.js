class aggregatePaginate {

    async aggregatePaginate(page, limit, Collection, aggregateBody, sort) {
        try {
            page = Number(page)
            limit = Number(limit)

            const count = await Collection.aggregate([
                ...aggregateBody,
                {
                    $count: "count"
                }
            ])

            const docs = await Collection.aggregate([
                ...aggregateBody,
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ])
                .sort(sort)

            const totalDocs = count[0]?.count ?? 0
            const totalPages = Math.ceil(totalDocs / limit)

            return {
                docs, page, totalPages
            }
        } catch (e) {
            console.log(e)
        }
    }

}
export default new aggregatePaginate()