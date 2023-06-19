interface IAggregatePaginate{
    page: number
    limit: number
    Collection: any
    aggregateBody: any
    sort: any
}

class aggregatePaginate {
    async aggregatePaginate({ page, limit, Collection, aggregateBody, sort }: IAggregatePaginate)  {
      try {
  
        const count = await Collection.aggregate([
          ...aggregateBody,
          { $count: "count" }
        ])
  
        const docs = await Collection.aggregate([
          ...aggregateBody,
          {
            $sort: sort
          },
          {
            $skip: (+page - 1) * limit
          },
          {
            $limit: limit
          }
        ])
  
        const totalDocs = count[0]?.count ?? 0
        const totalPages = Math.ceil(totalDocs / limit)
  
        console.log(docs, 'docs');
        console.log(totalPages, 'totalPages');
        
        return {
          docs: docs || [], // returns an empty array if docs is undefined
          page, totalPages
        }

      } catch (e) {
        console.log(e)
        return {
          docs: [],
          page: 0,
          totalPages: 0,
        } // returns an object with default values in case of error
      }
    }
  }
  export default new aggregatePaginate()
  