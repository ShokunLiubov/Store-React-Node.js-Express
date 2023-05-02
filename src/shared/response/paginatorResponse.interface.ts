
export interface IPaginatorResponse {
  hasNextPage: boolean
  hasPrevPage:boolean
  limit: number
  nextPage:number | null
  page: number
  pagingCounter:number | null
  prevPage:number | null
  totalDocs: number
  totalPages: number
}
